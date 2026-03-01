import React, { useState, useMemo } from 'react';

const emptyService = {
    name: '',
    category: 'Faciales',
    minutes: 60,
    price: 0,
    image: '',
    expectedResult: '',
    description: '',
    detailedDescription: ''
};

const emptyGallery = {
    title: '',
    before: '',
    after: ''
};

export const AdminPanel = ({ services = [], gallery = [] }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('services');
    const [currentEdit, setCurrentEdit] = useState(null);
    const [editType, setEditType] = useState('');

    // DRAFTS SYSTEM: A map of path -> { action: 'update' | 'delete', type, slug, content }
    const [drafts, setDrafts] = useState({});

    const [isPublishing, setIsPublishing] = useState(false);
    const [publishMessage, setPublishMessage] = useState({ text: '', type: '' });

    const totalDrafts = Object.keys(drafts).length;

    // Merged views for display: override original data with local drafts
    const mergedServices = useMemo(() => {
        let list = [...services].filter(svc => {
            const tempSlug = buildSlug(svc.name);
            const path = `src/data/services/${tempSlug}.json`;
            // Exclude if deeply deleted
            return !(drafts[path] && drafts[path].action === 'delete');
        });

        // Apply string-based updates or pure additions
        Object.values(drafts).forEach(draft => {
            if (draft.type === 'service' && draft.action === 'update') {
                const existingIndex = list.findIndex(svc => buildSlug(svc.name) === draft.originalSlug || buildSlug(svc.name) === buildSlug(draft.content.name));
                if (existingIndex >= 0) {
                    list[existingIndex] = { ...draft.content, _isDraft: true };
                } else {
                    list.push({ ...draft.content, _isDraft: true });
                }
            }
        });
        return list;
    }, [services, drafts]);

    const mergedGallery = useMemo(() => {
        let list = [...gallery].filter(g => {
            const tempSlug = buildSlug(g.title);
            const path = `src/data/gallery/${tempSlug}.json`;
            return !(drafts[path] && drafts[path].action === 'delete');
        });

        Object.values(drafts).forEach(draft => {
            if (draft.type === 'gallery' && draft.action === 'update') {
                const existingIndex = list.findIndex(g => buildSlug(g.title) === draft.originalSlug || buildSlug(g.title) === buildSlug(draft.content.title));
                if (existingIndex >= 0) {
                    list[existingIndex] = { ...draft.content, _isDraft: true };
                } else {
                    list.push({ ...draft.content, _isDraft: true });
                }
            }
        });
        return list;
    }, [gallery, drafts]);


    function buildSlug(text) {
        if (!text) return 'untitled';
        return text.toString().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'hydraadmin2026' || process.env.REACT_APP_ADMIN_PASSWORD === password) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Contraseña incorrecta');
        }
    };

    const handleSaveDraft = (e) => {
        e.preventDefault();
        let slug = '';
        let path = '';
        let content = { ...currentEdit };
        delete content.originalSlug;
        delete content._isDraft;

        if (editType === 'service') {
            if (!content.name) return alert('El nombre es obligatorio');
            slug = currentEdit.originalSlug || buildSlug(content.name);
            path = `src/data/services/${slug}.json`;
        } else {
            if (!content.title) return alert('El título es obligatorio');
            slug = currentEdit.originalSlug || buildSlug(content.title);
            path = `src/data/gallery/${slug}.json`;
        }

        setDrafts(prev => ({
            ...prev,
            [path]: {
                action: 'update',
                type: editType,
                originalSlug: currentEdit.originalSlug || slug,
                content: content
            }
        }));

        setCurrentEdit(null);
    };

    const handleDeleteDraft = (item, type) => {
        if (!window.confirm(`¿Estás seguro de querer eliminar "${type === 'service' ? item.name : item.title}"?`)) return;

        let slug = buildSlug(type === 'service' ? item.name : item.title);
        let path = `src/data/${type === 'service' ? 'services' : 'gallery'}/${slug}.json`;

        setDrafts(prev => ({
            ...prev,
            [path]: {
                action: 'delete',
                type: type,
                originalSlug: slug
            }
        }));
    };

    const handlePublishAll = async () => {
        if (totalDrafts === 0) return;
        setIsPublishing(true);
        setPublishMessage({ text: 'Empaquetando publicando cambios...', type: 'info' });

        // Compile payload
        const payloadChanges = Object.keys(drafts).map(path => {
            const draft = drafts[path];
            if (draft.action === 'delete') {
                return { path, isDelete: true };
            } else {
                return { path, content: JSON.stringify(draft.content, null, 2), isDelete: false };
            }
        });

        try {
            const response = await fetch('/api/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    changes: payloadChanges,
                    message: `CMS: Sincronización en lote (${totalDrafts} modificaciones)`
                })
            });

            const data = await response.json();

            if (data.success) {
                setPublishMessage({ text: '¡Todo publicado! En ~1 minuto se reflejará en vivo.', type: 'success' });
                setTimeout(() => {
                    setDrafts({});
                    setPublishMessage({ text: '', type: '' });
                }, 4000);
            } else {
                setPublishMessage({ text: `Error: ${data.error}`, type: 'error' });
            }
        } catch (err) {
            setPublishMessage({ text: 'Hubo un error de conexión con Vercel/GitHub.', type: 'error' });
        }
        setIsPublishing(false);
    };

    const openEditor = (item, type) => {
        const originalSlug = item ? buildSlug(item.name || item.title) : undefined;
        if (type === 'service') {
            setCurrentEdit(item ? { ...item, originalSlug } : { ...emptyService });
        } else {
            setCurrentEdit(item ? { ...item, originalSlug } : { ...emptyGallery });
        }
        setEditType(type);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-hydra-beige flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
                    <h2 className="text-3xl font-serif text-hydra-dark mb-6 text-center">Panel Admin</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-hydra-dark/70 mb-2">Contraseña Segura</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-hydra-pink"
                            placeholder="••••••••"
                        />
                    </div>
                    {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-hydra-dark text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors"
                    >
                        Ingresar de forma segura
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-6">Los cambios utilizan tecnología Vercel Serverless.</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-hydra-dark pb-20">
            <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
                <div className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-serif tracking-wide">Hydra Skin CMS</h1>
                        <a href="/" target="_blank" rel="noreferrer" className="text-xs font-semibold text-hydra-dark/60 hover:text-hydra-pink uppercase tracking-wider bg-gray-100 px-3 py-1.5 rounded-full">
                            Ver Web
                        </a>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                        {totalDrafts > 0 && (
                            <button
                                onClick={handlePublishAll}
                                disabled={isPublishing}
                                className="flex-1 sm:flex-none animate-pulse-slow bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg disabled:opacity-50 disabled:animate-none"
                            >
                                {isPublishing ? 'Publicando...' : `⚡ Publicar Todo (${totalDrafts})`}
                            </button>
                        )}
                        <button onClick={() => setIsAuthenticated(false)} className="text-sm px-4 py-2 text-gray-600 font-semibold hover:text-red-500 transition-colors">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
                {publishMessage.text && (
                    <div className={`w-full py-2 px-4 text-center text-sm font-bold shadow-inner ${publishMessage.type === 'error' ? 'bg-red-500 text-white' : publishMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-500 text-white'}`}>
                        {publishMessage.text}
                    </div>
                )}
            </header>

            <main className="p-4 sm:p-8 max-w-5xl mx-auto">
                {currentEdit ? (
                    // EDITOR VIEW
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8 border-b pb-4">
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-hydra-dark">
                                {currentEdit.originalSlug ? 'Editar' : 'Añadir'} {editType === 'service' ? 'Servicio' : 'Caso de Éxito'}
                            </h2>
                            <button
                                onClick={() => setCurrentEdit(null)}
                                className="text-gray-400 font-semibold hover:text-hydra-pink text-sm uppercase tracking-wider"
                            >
                                ← Volver
                            </button>
                        </div>

                        <form onSubmit={handleSaveDraft} className="space-y-6">
                            {editType === 'service' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre del Servicio</label>
                                            <input
                                                type="text" required
                                                value={currentEdit.name}
                                                onChange={e => setCurrentEdit({ ...currentEdit, name: e.target.value })}
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                                placeholder="Ej. Limpieza Facial Premium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Categoría</label>
                                            <select
                                                value={currentEdit.category}
                                                onChange={e => setCurrentEdit({ ...currentEdit, category: e.target.value })}
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all appearance-none"
                                            >
                                                <option value="Faciales">Faciales</option>
                                                <option value="Corporales">Corporales</option>
                                                <option value="Tecnologicos">Tecnológicos</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Duración (Mins)</label>
                                            <input
                                                type="number" required
                                                value={currentEdit.minutes}
                                                onChange={e => setCurrentEdit({ ...currentEdit, minutes: Number(e.target.value) })}
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Precio ($)</label>
                                            <input
                                                type="number" required
                                                value={currentEdit.price}
                                                onChange={e => setCurrentEdit({ ...currentEdit, price: Number(e.target.value) })}
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 flex justify-between">
                                            <span>URL de Imagen (Cloudinary)</span>
                                            <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Abrir Cloudinary</a>
                                        </label>
                                        <input
                                            type="url"
                                            value={currentEdit.image}
                                            onChange={e => setCurrentEdit({ ...currentEdit, image: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                            placeholder="Pega el enlace web aquí. Ej: https://res.cloudinary.com/..."
                                        />
                                        {currentEdit.image && (
                                            <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border">
                                                <img src={currentEdit.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="divider border-b pt-4"></div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-hydra-pink mb-2">Resultado Esperado (Resaltado)</label>
                                        <input
                                            type="text" required
                                            value={currentEdit.expectedResult}
                                            onChange={e => setCurrentEdit({ ...currentEdit, expectedResult: e.target.value })}
                                            className="w-full p-4 bg-pink-50/30 border border-pink-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                            placeholder="Breve frase del beneficio principal"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Descripción Corta (Tarjeta)</label>
                                        <textarea
                                            required rows="3"
                                            value={currentEdit.description}
                                            onChange={e => setCurrentEdit({ ...currentEdit, description: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 flex justify-between">
                                            <span>Descripción Detallada (Modal Extendido) - OPCIONAL</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={currentEdit.detailedDescription}
                                            onChange={e => setCurrentEdit({ ...currentEdit, detailedDescription: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all resize-none leading-relaxed"
                                            placeholder="Si dejas esto en blanco, se usará la descripción corta."
                                        />
                                    </div>
                                </>
                            )}

                            {editType === 'gallery' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Título del Tratamiento / Caso</label>
                                        <input
                                            type="text" required
                                            value={currentEdit.title}
                                            onChange={e => setCurrentEdit({ ...currentEdit, title: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-hydra-pink outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Foto 1: ANTES (Localizador en Cloudinary)</label>
                                            <input
                                                type="url" required
                                                value={currentEdit.before}
                                                onChange={e => setCurrentEdit({ ...currentEdit, before: e.target.value })}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-hydra-pink outline-none"
                                            />
                                            {currentEdit.before && <img src={currentEdit.before} className="w-full h-40 object-cover mt-4 rounded-xl shadow-sm" alt="Antes" />}
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Foto 2: DESPUÉS (Localizador en Cloudinary)</label>
                                            <input
                                                type="url" required
                                                value={currentEdit.after}
                                                onChange={e => setCurrentEdit({ ...currentEdit, after: e.target.value })}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-hydra-pink outline-none"
                                            />
                                            {currentEdit.after && <img src={currentEdit.after} className="w-full h-40 object-cover mt-4 rounded-xl shadow-sm" alt="Después" />}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-4 pt-8 mt-8 border-t bg-white">
                                <button
                                    type="button"
                                    onClick={() => setCurrentEdit(null)}
                                    className="px-6 py-3 font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Descartar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-hydra-dark text-white rounded-xl font-bold hover:bg-black transition-colors"
                                >
                                    Guardar en Borradores
                                </button>
                            </div>
                        </form>
                    </div>

                ) : (
                    // LIST VIEW
                    <>
                        <div className="flex gap-4 border-b-2 border-gray-200 mb-8 max-w-min">
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`py-3 px-6 font-bold uppercase tracking-widest text-sm transition-all whitespace-nowrap -mb-[2px] ${activeTab === 'services' ? 'border-b-2 border-hydra-pink text-hydra-dark' : 'border-b-2 border-transparent text-gray-400 hover:text-hydra-dark'}`}
                            >
                                Catálogo ({mergedServices.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('gallery')}
                                className={`py-3 px-6 font-bold uppercase tracking-widest text-sm transition-all whitespace-nowrap -mb-[2px] ${activeTab === 'gallery' ? 'border-b-2 border-hydra-pink text-hydra-dark' : 'border-b-2 border-transparent text-gray-400 hover:text-hydra-dark'}`}
                            >
                                Casos ({mergedGallery.length})
                            </button>
                        </div>

                        <div className="bg-white p-2 sm:p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2 sm:px-0">
                                <div>
                                    <h2 className="text-2xl font-bold font-serif text-hydra-dark">
                                        {activeTab === 'services' ? 'Inventario de Protocolos' : 'Galería Antes/Después'}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {activeTab === 'services' ? 'Agrega o edita los tratamientos que ofreces.' : 'Muestra el éxito de tus intervenciones estéticas.'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => openEditor(null, activeTab === 'services' ? 'service' : 'gallery')}
                                    className="mt-4 sm:mt-0 bg-hydra-pink text-hydra-dark px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:brightness-105 transition-all flex items-center gap-2"
                                >
                                    <span className="text-lg">+</span> Añadir Documento
                                </button>
                            </div>

                            <div className="space-y-3">
                                {activeTab === 'services' && (
                                    mergedServices.length === 0 ? <p className="text-gray-500 p-8 text-center bg-gray-50 rounded-2xl border border-dashed">No hay servicios catalogados todavía.</p>
                                        : mergedServices.map((svc, idx) => (
                                            <div key={idx} className={`group flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-2xl transition-all border ${svc._isDraft ? 'bg-orange-50/50 border-orange-200' : 'bg-white border-gray-100 hover:border-hydra-pink/30 hover:shadow-md'}`}>
                                                <div className="flex items-center gap-4 w-full">
                                                    {svc.image ? (
                                                        <div className="w-14 h-14 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-200 shadow-inner">
                                                            <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300">
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-hydra-dark text-base">{svc.name}</p>
                                                            {svc._isDraft && <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Borrador Local</span>}
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{svc.category}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-xs font-bold text-emerald-600">${svc.price}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-xs font-medium text-gray-500">{svc.minutes} min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                                    <button onClick={() => handleDeleteDraft(svc, 'service')} className="text-red-400 font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                                                        Borrar
                                                    </button>
                                                    <button onClick={() => openEditor(svc, 'service')} className="bg-gray-50 text-hydra-dark font-bold text-xs uppercase tracking-wider px-4 py-2 border border-gray-200 rounded-xl group-hover:bg-hydra-dark group-hover:text-white transition-colors">
                                                        Editar
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                )}

                                {activeTab === 'gallery' && (
                                    mergedGallery.length === 0 ? <p className="text-gray-500 p-8 text-center bg-gray-50 rounded-2xl border border-dashed">No hay casos en galería todavía.</p>
                                        : mergedGallery.map((item, idx) => (
                                            <div key={idx} className={`group flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-2xl transition-all border ${item._isDraft ? 'bg-orange-50/50 border-orange-200' : 'bg-white border-gray-100 hover:border-hydra-pink/30 hover:shadow-md'}`}>
                                                <div className="flex items-center gap-4 w-full">
                                                    <div className="flex -space-x-3 flex-shrink-0">
                                                        <img src={item.before} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" alt="Antes" />
                                                        <img src={item.after} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" alt="Después" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-hydra-dark">{item.title}</p>
                                                            {item._isDraft && <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Borrador</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                                    <button onClick={() => handleDeleteDraft(item, 'gallery')} className="text-red-400 font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                                                        Borrar
                                                    </button>
                                                    <button onClick={() => openEditor(item, 'gallery')} className="bg-gray-50 text-hydra-dark font-bold text-xs uppercase tracking-wider px-4 py-2 border border-gray-200 rounded-xl group-hover:bg-hydra-dark group-hover:text-white transition-colors">
                                                        Editar
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
