import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const WHATSAPP_NUMBER = "51914063936"; 

const stats = [
  { label: "Años de Experiencia", value: 5, suffix: "+" },
  { label: "Clientes Felices", value: 1200, suffix: "+" },
  { label: "Tratamientos Únicos", value: 15, suffix: "+" },
  { label: "% Productos Orgánicos", value: 100, suffix: "%" },
];

function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const countersStarted = useRef(false);
  const statsRef = useRef(null);
  const formButtonText = "Confirmar Cita";
  const [btnLabel, setBtnLabel] = useState(formButtonText);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
  });

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const animateCount = (index, target) => {
    const duration = 1200;
    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);
      setCounts((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            stats.forEach((stat, idx) => animateCount(idx, stat.value));
          }
        });
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, service, date } = formData;
    const message = `Hola Hydra Skin, quiero agendar una cita.\n\n` +
      `Nombre: ${name || "No especificado"}\n` +
      `Teléfono: ${phone || "No especificado"}\n` +
      `Email: ${email || "No especificado"}\n` +
      `Servicio: ${service || "Por definir"}\n` +
      `Fecha deseada: ${date || "Próxima disponible"}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setBtnLabel("Abriendo WhatsApp...");
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setBtnLabel(formButtonText);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
      });
    }, 2000);
  };

  return (
    <div className="bg-hydra-bg text-hydra-dark font-sans antialiased selection:bg-hydra-pink selection:text-white">
      {/* Navigation */}
      <nav
        id="navbar"
        className={`fixed w-full z-50 transition-all duration-300 ${
          navSolid
            ? "bg-[#F0EFED]/95 shadow-md py-3 backdrop-blur-md"
            : "bg-black/25 py-5 backdrop-blur-lg"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => scrollToId("inicio")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-droplet text-hydra-pink text-xl" />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`text-xl font-serif font-bold tracking-widest leading-none ${
                  navSolid ? "text-hydra-dark" : "text-white drop-shadow"
                }`}
              >
                HYDRA
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase mt-1 font-bold text-hydra-pink">
                Skin Center
              </span>
            </div>
          </button>

          <div className="hidden md:flex space-x-10 items-center text-xs font-bold uppercase tracking-widest">
            <button
              onClick={() => scrollToId("inicio")}
              className={`hover:text-hydra-pink transition-colors ${
                navSolid ? "text-hydra-dark" : "text-white drop-shadow"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToId("servicios")}
              className={`hover:text-hydra-pink transition-colors ${
                navSolid ? "text-hydra-dark" : "text-white drop-shadow"
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToId("nosotros")}
              className={`hover:text-hydra-pink transition-colors ${
                navSolid ? "text-hydra-dark" : "text-white drop-shadow"
              }`}
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToId("galeria")}
              className={`hover:text-hydra-pink transition-colors ${
                navSolid ? "text-hydra-dark" : "text-white drop-shadow"
              }`}
            >
              Galería
            </button>
            <button
              onClick={() => scrollToId("contacto")}
              className={`px-8 py-3 font-bold uppercase tracking-widest transition-all ${
                navSolid
                  ? "bg-hydra-pink text-hydra-dark hover:shadow-lg hover:brightness-105"
                  : "bg-white/90 text-hydra-dark hover:bg-white hover:shadow-lg"
              }`}
            >
              Agendar Cita
            </button>
          </div>

          <button
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden text-2xl focus:outline-none ${
              navSolid ? "text-hydra-dark" : "text-white"
            }`}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-hydra-bg z-40 transform transition-transform duration-300 flex flex-col items-center justify-center gap-8 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl text-hydra-dark"
          >
            <i className="fa-solid fa-times" />
          </button>
          <button
            onClick={() => scrollToId("inicio")}
            className="text-2xl font-serif text-hydra-dark hover:text-hydra-pink"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToId("servicios")}
            className="text-2xl font-serif text-hydra-dark hover:text-hydra-pink"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToId("nosotros")}
            className="text-2xl font-serif text-hydra-dark hover:text-hydra-pink"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToId("galeria")}
            className="text-2xl font-serif text-hydra-dark hover:text-hydra-pink"
          >
            Galería
          </button>
          <button
            onClick={() => scrollToId("contacto")}
            className="px-8 py-3 bg-hydra-pink text-hydra-dark font-bold uppercase tracking-widest"
          >
            Agendar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="inicio"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop"
            alt="Spa Relax"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-hydra-pink/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center md:text-left pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 border border-white/30 rounded-full backdrop-blur-md bg-white/10">
              <i className="fa-solid fa-sparkles text-hydra-pink text-xs" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                Bienestar & Estética
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-[1.1] text-white">
              Tu piel, tu mejor <br />
              <span className="italic text-hydra-pink">carta de presentación</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light max-w-lg leading-relaxed text-white/90">
              Especialistas en tratamientos faciales y bienestar integral.
              Recupera la luminosidad que te define con nuestros rituales
              personalizados en Nuevo Chimbote, Perú.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToId("contacto")}
                className="px-8 py-4 bg-hydra-pink text-hydra-dark uppercase tracking-widest text-xs font-bold transition-all shadow-lg hover:scale-105"
              >
                Reservar Ahora
              </button>
              <button
                onClick={() => scrollToId("servicios")}
                className="border border-white px-8 py-4 uppercase tracking-widest text-xs font-bold transition-colors backdrop-blur-sm text-white hover:bg-white hover:text-hydra-dark"
              >
                Explorar Servicios
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-hydra-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-hydra-pink mb-4">
              Experiencia Comprobada
            </h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border-b-2 border-hydra-pink"
                >
                  <span className="text-3xl font-serif text-hydra-dark">
                    {counts[idx]}
                    {stat.suffix}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest mt-2 text-gray-500 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 overflow-hidden shadow-2xl rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                  alt="Tratamiento Facial"
                  className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-hydra-beige -z-0" />
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2 text-hydra-dark">
                <span className="w-8 h-px bg-hydra-pink" /> Sobre Hydra Skin
              </h3>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-hydra-dark leading-tight">
                Belleza que <br />
                <span className="italic text-hydra-pink">inspira confianza</span>
              </h2>
              <p className="leading-loose mb-8 font-light text-gray-600">
                En Hydra Skin, fusionamos técnicas dermatológicas de vanguardia
                con un ambiente diseñado para tu relajación absoluta. Creemos en
                el poder del cuidado personal no como un lujo, sino como una
                forma esencial de amor propio.
              </p>
              <p className="leading-loose mb-8 font-light text-gray-600">
                Nuestros especialistas están dedicado a entender las
                necesidades únicas de tu piel, creando protocolos
                personalizados que restauran tu brillo natural desde la primera
                sesión.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-8">
                <div className="flex flex-col gap-2 group">
                  <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink transition-colors">
                    <i className="fa-solid fa-droplet text-hydra-pink text-xl group-hover:text-hydra-dark transition-colors" />
                  </div>
                  <h4 className="font-serif text-lg text-hydra-dark mt-2">
                    Hidratación Profunda
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Tecnología Vortex
                  </p>
                </div>
                <div className="flex flex-col gap-2 group">
                  <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink transition-colors">
                    <i className="fa-brands fa-envira text-hydra-pink text-xl group-hover:text-hydra-dark transition-colors" />
                  </div>
                  <h4 className="font-serif text-lg text-hydra-dark mt-2">
                    Bienestar Integral
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Experiencia Sensorial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 bg-hydra-beige relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#252525 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block text-hydra-dark">
              Menú de Servicios
            </span>
            <h2 className="text-4xl font-serif text-hydra-dark">
              Rituales de Belleza
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-hydra-bg p-8 hover:-translate-y-2 transition-transform duration-500 shadow-lg cursor-pointer group">
              <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-xl font-serif text-hydra-dark group-hover:text-hydra-pink transition-colors">
                    Hydra-Facial
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    60 Minutos
                  </p>
                </div>
                <span className="font-bold text-lg text-hydra-pink">$120</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Limpieza profunda, exfoliación e hidratación intensiva. Utiliza
                tecnología de vórtice para una piel radiante al instante.
              </p>
              <button className="w-full py-3 border border-hydra-dark text-hydra-dark text-xs uppercase tracking-widest hover:bg-hydra-dark hover:text-hydra-pink transition-colors font-bold">
                Detalles
              </button>
            </div>

            <div className="bg-hydra-dark p-8 -translate-y-4 shadow-2xl relative cursor-pointer group">
              <div className="absolute top-0 right-0 bg-hydra-pink text-hydra-dark text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
                Más Popular
              </div>
              <div className="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
                <div>
                  <h3 className="text-xl font-serif text-white group-hover:text-hydra-pink transition-colors">
                    Masaje Glow
                  </h3>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wide">
                    80 Minutos
                  </p>
                </div>
                <span className="font-bold text-lg text-hydra-pink">$90</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Masaje relajante con aceites esenciales y piedras calientes. La
                experiencia definitiva para desconectar cuerpo y mente.
              </p>
              <button className="w-full py-3 bg-hydra-pink text-hydra-dark text-xs uppercase tracking-widest hover:brightness-110 transition-colors font-bold border border-transparent">
                Reservar
              </button>
            </div>

            <div className="bg-hydra-bg p-8 hover:-translate-y-2 transition-transform duration-500 shadow-lg cursor-pointer group">
              <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-xl font-serif text-hydra-dark group-hover:text-hydra-pink transition-colors">
                    Ritual Detox
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    90 Minutos
                  </p>
                </div>
                <span className="font-bold text-lg text-hydra-pink">$150</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Envoltura corporal de algas marinas y exfoliación con sales
                minerales para eliminar toxinas y suavizar la piel.
              </p>
              <button className="w-full py-3 border border-hydra-dark text-hydra-dark text-xs uppercase tracking-widest hover:bg-hydra-dark hover:text-hydra-pink transition-colors font-bold">
                Detalles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-24 bg-hydra-bg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-hydra-pink">
              Transformaciones reales
            </span>
            <h2 className="text-3xl font-serif mb-2 text-hydra-dark">
              Estética Visual
            </h2>
            <div className="w-12 h-1 bg-hydra-pink mb-4" />
            <p className="text-sm text-gray-600 max-w-xl mb-4">
              Antes y después, rituales y resultados que compartimos a diario con nuestra comunidad.
            </p>
            <a
              href="https://www.instagram.com/hydra.skin.aesthetic/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest hover:text-hydra-pink transition-colors flex items-center gap-2"
            >
              <i className="fa-brands fa-instagram text-lg" /> @hydraskin_center
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1556228720-1957be6a96fe?q=80&w=1974&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Tratamiento"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold tracking-wide">
                Transformaciones reales
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="fa-solid fa-heart text-white text-3xl drop-shadow-lg" />
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Producto"
              />
            </div>
            <div className="relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Crema"
              />
            </div>
            <div className="relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Planta"
              />
            </div>
            <div className="relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Aceites"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-24 bg-hydra-dark text-hydra-bg relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3 space-y-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block text-hydra-pink">
                  Contacto
                </span>
                <h2 className="text-4xl font-serif mb-6 text-white">
                  Inicia tu cambio
                </h2>
                <p className="font-light leading-relaxed text-white/80">
                  Estamos listos para atenderte. Déjanos tus datos y uno de
                  nuestros especialistas confirmará tu sesión a la brevedad.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-hydra-pink" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Ubicación</h4>
                    <p className="text-white/60 text-sm mt-1">
                      Av. Pacífico 230, Urb. Buenos Aires
                      <br />
                      Nuevo Chimbote, Áncash - Perú
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-phone text-hydra-pink" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Teléfono</h4>
                    <p className="text-white/60 text-sm mt-1">+51 987 654 321</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-envelope text-hydra-pink" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Email</h4>
                    <p className="text-white/60 text-sm mt-1">hola@hydraskin.pe</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 bg-hydra-bg p-8 md:p-12 shadow-2xl relative rounded-sm text-hydra-dark">
              <div className="absolute top-0 left-0 w-full h-2 bg-hydra-pink" />
              <form id="bookingForm" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleFieldChange}
                      className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleFieldChange}
                      className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                      placeholder="(51) 987 654 321"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Servicio
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFieldChange}
                      className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors text-gray-600"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Hydra-Facial">Hydra-Facial</option>
                      <option value="Masaje Glow">Masaje Glow</option>
                      <option value="Ritual Detox">Ritual Detox</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Fecha
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFieldChange}
                      className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors text-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-hydra-pink text-hydra-dark font-bold py-5 shadow-lg uppercase tracking-[0.2em] text-xs mt-4 transition-all hover:brightness-110"
                >
                  {btnLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#333] text-white py-12">
        <div className="container mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-hydra-pink rounded-full flex items-center justify-center text-hydra-dark">
              <i className="fa-solid fa-droplet" />
            </div>
            <span className="font-serif text-2xl tracking-widest">HYDRA SKIN</span>
          </div>

          <div className="flex gap-8 text-xs uppercase tracking-widest text-white/50">
            <button onClick={() => scrollToId("inicio")} className="hover:text-white transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToId("servicios")} className="hover:text-white transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToId("nosotros")} className="hover:text-white transition-colors">
              Nosotros
            </button>
            <button onClick={() => scrollToId("contacto")} className="hover:text-white transition-colors">
              Contacto
            </button>
          </div>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.instagram.com/hydra.skin.aesthetic/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-hydra-pink hover:text-hydra-dark hover:border-hydra-pink transition-all"
            >
              <i className="fa-brands fa-instagram" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-hydra-pink hover:text-hydra-dark hover:border-hydra-pink transition-all"
            >
              <i className="fa-brands fa-facebook-f" />
            </a>
          </div>

          <div className="text-[10px] text-white/30 border-t border-white/10 pt-6 w-full max-w-xs mt-4">
            (c) 2026 Hydra Skin Center.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


