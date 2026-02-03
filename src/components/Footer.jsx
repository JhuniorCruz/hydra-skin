import React from "react";

export const Footer = ({ scrollToId }) => (
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
);
