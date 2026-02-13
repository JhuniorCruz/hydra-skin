import React from "react";

export const Hero = ({ scrollToId }) => (
  <header id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop"
        alt="Spa Relax"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-hydra-pink/28 mix-blend-overlay" />
    </div>

    <div className="relative z-10 container mx-auto px-6 text-center md:text-left pt-20">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 border border-hydra-pink/70 rounded-full backdrop-blur-md bg-white/10">
          <i className="fa-solid fa-sparkles text-hydra-pink text-xs" />
          <span className="text-sm uppercase tracking-wide font-bold text-white">Bienestar & Estetica</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-[1.1] text-white">
          Tu piel, tu mejor <br />
          <span className="italic text-hydra-pink">carta de presentacion</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 font-light max-w-lg leading-relaxed text-white/90">
          Especialistas en tratamientos faciales y bienestar integral. Recupera la luminosidad que te define con
          nuestros rituales personalizados en Nuevo Chimbote, Peru.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => scrollToId("contacto")}
            className="px-8 py-4 bg-hydra-pink text-hydra-dark uppercase tracking-widest text-xs font-bold transition-all shadow-lg hover:translate-y-[-1px]"
          >
            Reservar Ahora
          </button>
          <button
            onClick={() => scrollToId("servicios")}
            className="border border-hydra-pink/70 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-colors backdrop-blur-sm text-white hover:bg-white hover:text-hydra-dark"
          >
            Explorar Servicios
          </button>
        </div>
      </div>
    </div>
  </header>
);
