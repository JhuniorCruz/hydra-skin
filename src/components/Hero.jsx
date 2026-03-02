import React from "react";

export const Hero = ({ scrollToId }) => (
  <header id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://res.cloudinary.com/dscohihoe/image/upload/v1772413238/hero_ia1l8u.png"
        alt="Cabina de cuidado facial premium"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-hydra-pink/12 mix-blend-overlay" />
    </div>

    <div className="relative z-10 container mx-auto px-6 text-center md:text-left pt-20">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 border border-white/30 rounded-full backdrop-blur-md bg-white/10">
          <i className="fa-solid fa-sparkles text-hydra-pink text-xs" />
          <span className="text-sm uppercase tracking-wide font-bold text-white">Estetica clinica y bienestar</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-[1.1] text-white">
          Rituales de renovacion
          <br />
          <span className="italic text-white/90">para tu piel</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 font-light max-w-lg leading-relaxed text-white/90">
          Protocolos personalizados para recuperar luminosidad, firmeza y confianza con una experiencia premium en
          Nuevo Chimbote, Peru.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => scrollToId("contacto")}
            className="px-8 py-4 bg-hydra-pink text-hydra-dark uppercase tracking-widest text-xs font-bold transition-all shadow-lg hover:translate-y-[-1px] rounded-md"
          >
            Agendar evaluacion
          </button>
          <button
            onClick={() => scrollToId("servicios")}
            className="border border-white/45 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-colors backdrop-blur-sm text-white hover:bg-white hover:text-hydra-dark rounded-md"
          >
            Descubrir tratamientos
          </button>
        </div>
      </div>
    </div>
  </header>
);
