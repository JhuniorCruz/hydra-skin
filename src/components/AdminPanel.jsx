import React, { useState } from 'react';

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

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const buildSlug = (text) => {
        return text.toString().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'hydraadmin2026' || process.env.REACT_APP_ADMIN_PASSWORD === password) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Contraseña incorrecta');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('Guardando... la página tardará ~1 minuto en reconstruirse.');

        let slug = '';
        let path = '';
        let content = { ...currentEdit };
        delete content.originalSlug;

        if (editType === 'service') {
            if (!content.name) return alert('El nombre es obligatorio');
            slug = currentEdit.originalSlug || buildSlug(content.name);
            path = `src/data/services/${slug}.json`;
        } else {
            if (!content.title) return alert('El título es obligatorio');
            slug = currentEdit.originalSlug || buildSlug(content.title);
            path = `src/data/gallery/${slug}.json`;
        }

        try {
            const response = await fetch('/api/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path,
                    content: JSON.stringify(content, null, 2),
                    message: `CMS: Modificando ${slug}`
                })
            });

            const data = await response.json();

            if (data.success) {
                setMessage('¡Guardado con éxito! Recarga la página en unos instantes para ver los cambios.');
                setTimeout(() => {
                    setCurrentEdit(null);
                    setMessage('');
                }, 3000);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            setMessage('Hubo un error de conexión.');
        }
        setIsLoading(false);
    };

    const openEditor = (item, type) => {
        // Determine its original slug based on the convention used.
        // If it's a new item, originalSlug will be undefined.
        const originalSlug = item ? buildSlug(item.name || item.title) : undefined;

        if (type === 'service') {
            setCurrentEdit(item ? { ...item, originalSlug } : { ...emptyService });
        } else {
            setCurrentEdit(item ? { ...item, originalSlug } : { ...emptyGallery });
        }
        setEditType(type);
        setMessage('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-hydra-beige flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
                    <h2 className="text-3xl font-serif text-hydra-dark mb-6 text-center">Panel Admin</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-hydra-dark/70 mb-2">Contraseña</label>
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
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-hydra-dark">
            <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
                <h1 className="text-2xl font-serif">Hydra Skin CMS</h1>
                <div className="flex items-center gap-4">
                    <a href="/" className="text-sm font-semibold text-hydra-dark/70 hover:text-hydra-pink">Ir a la Web</a>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200">
                        Salir
                    </button>
                </div>
            </header>

            <main className="p-4 sm:p-8 max-w-7xl mx-auto">
                {currentEdit ? (
                    // EDITOR VIEW
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold">
                                {currentEdit.originalSlug ? 'Editar' : 'Añadir'} {editType === 'service' ? 'Servicio' : 'Caso de Éxito'}
                            </h2>
                            <button
                                onClick={() => setCurrentEdit(null)}
                                className="text-gray-500 hover:text-hydra-dark"
                            >
                                Volver
                            </button>
                        </div>

                        {message && (
                            <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-6">
                            {editType === 'service' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nombre del Servicio</label>
                                            <input
                                                type="text" required
                                                value={currentEdit.name}
                                                onChange={e => setCurrentEdit({ ...currentEdit, name: e.target.value })}
                                                className="w-full p-3 border rounded-xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categoría</label>
                                            <select
                                                value={currentEdit.category}
                                                onChange={e => setCurrentEdit({ ...currentEdit, category: e.target.value })}
                                                className="w-full p-3 border rounded-xl"
                                            >
                                                <option value="Faciales">Faciales</option>
                                                <option value="Corporales">Corporales</option>
                                                <option value="Tecnologicos">Tecnológicos</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duración (Mins)</label>
                                            <input
                                                type="number" required
                                                value={currentEdit.minutes}
                                                onChange={e => setCurrentEdit({ ...currentEdit, minutes: Number(e.target.value) })}
                                                className="w-full p-3 border rounded-xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Precio ($)</label>
                                            <input
                                                type="number" required
                                                value={currentEdit.price}
                                                onChange={e => setCurrentEdit({ ...currentEdit, price: Number(e.target.value) })}
                                                className="w-full p-3 border rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">URL de Imagen (Cloudinary)</label>
                                        <input
                                            type="url"
                                            value={currentEdit.image}
                                            onChange={e => setCurrentEdit({ ...currentEdit, image: e.target.value })}
                                            className="w-full p-3 border rounded-xl"
                                            placeholder="https://res.cloudinary.com/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Resultado Esperado</label>
                                        <input
                                            type="text" required
                                            value={currentEdit.expectedResult}
                                            onChange={e => setCurrentEdit({ ...currentEdit, expectedResult: e.target.value })}
                                            className="w-full p-3 border rounded-xl"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Descripción Breve</label>
                                        <textarea
                                            required rows="3"
                                            value={currentEdit.description}
                                            onChange={e => setCurrentEdit({ ...currentEdit, description: e.target.value })}
                                            className="w-full p-3 border rounded-xl resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Descripción Detallada (Opcional Markdown)</label>
                                        <textarea
                                            rows="6"
                                            value={currentEdit.detailedDescription}
                                            onChange={e => setCurrentEdit({ ...currentEdit, detailedDescription: e.target.value })}
                                            className="w-full p-3 border rounded-xl resize-none font-mono text-sm"
                                        />
                                    </div>
                                </>
                            )}

                            {editType === 'gallery' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Título del Caso</label>
                                        <input
                                            type="text" required
                                            value={currentEdit.title}
                                            onChange={e => setCurrentEdit({ ...currentEdit, title: e.target.value })}
                                            className="w-full p-3 border rounded-xl"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">URL Imagen ANTES (Cloudinary)</label>
                                            <input
                                                type="url" required
                                                value={currentEdit.before}
                                                onChange={e => setCurrentEdit({ ...currentEdit, before: e.target.value })}
                                                className="w-full p-3 border rounded-xl"
                                                placeholder="https://res.cloudinary.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">URL Imagen DESPUÉS (Cloudinary)</label>
                                            <input
                                                type="url" required
                                                value={currentEdit.after}
                                                onChange={e => setCurrentEdit({ ...currentEdit, after: e.target.value })}
                                                className="w-full p-3 border rounded-xl"
                                                placeholder="https://res.cloudinary.com/..."
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setCurrentEdit(null)}
                                    className="px-6 py-3 font-semibold text-gray-500"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-3 bg-hydra-dark text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-70"
                                >
                                    {isLoading ? 'Guardando...' : 'Guardar y Publicar en Web'}
                                </button>
                            </div>
                        </form>
                    </div>

                ) : (
                    // LIST VIEW
                    <>
                        <div className="flex gap-4 border-b mb-8">
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`py-3 px-2 font-bold border-b-2 transition-colors ${activeTab === 'services' ? 'border-hydra-pink text-hydra-dark' : 'border-transparent text-gray-400'}`}
                            >
                                Servicios ({services.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('gallery')}
                                className={`py-3 px-2 font-bold border-b-2 transition-colors ${activeTab === 'gallery' ? 'border-hydra-pink text-hydra-dark' : 'border-transparent text-gray-400'}`}
                            >
                                Galería ({gallery.length})
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border max-w-4xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold font-serif">
                                    {activeTab === 'services' ? 'Administrar Servicios' : 'Administrar Galería'}
                                </h2>
                                <button
                                    onClick={() => openEditor(null, activeTab === 'services' ? 'service' : 'gallery')}
                                    className="bg-hydra-pink text-hydra-dark px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:brightness-105"
                                >
                                    + Añadir Nuevo
                                </button>
                            </div>

                            <div className="space-y-3">
                                {activeTab === 'services' && (
                                    services.length === 0 ? <p className="text-gray-500 text-sm">No hay servicios registrados.</p>
                                        : services.map((svc, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-xl hover:bg-gray-50 gap-4">
                                                <div className="flex items-center gap-4">
                                                    {svc.image ? (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                                            <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0"></div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-hydra-dark">{svc.name}</p>
                                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{svc.category} • ${svc.price}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => openEditor(svc, 'service')} className="text-hydra-pink font-bold text-sm px-4 py-2 border border-hydra-pink/30 rounded-lg hover:bg-hydra-pink hover:text-hydra-dark transition-colors">
                                                    Editar
                                                </button>
                                            </div>
                                        ))
                                )}

                                {activeTab === 'gallery' && (
                                    gallery.length === 0 ? <p className="text-gray-500 text-sm">No hay casos en galería.</p>
                                        : gallery.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50">
                                                <p className="font-bold text-hydra-dark">{item.title}</p>
                                                <button onClick={() => openEditor(item, 'gallery')} className="text-hydra-pink font-bold text-sm px-4 py-2 border border-hydra-pink/30 rounded-lg hover:bg-hydra-pink hover:text-hydra-dark transition-colors">
                                                    Editar
                                                </button>
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
