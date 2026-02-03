import React from "react";

export const MobileMenu = ({ open, onClose, scrollToId }) => (
  <div
    className={`fixed inset-0 bg-hydra-bg z-40 transform transition-transform duration-300 flex flex-col items-center justify-center gap-8 md:hidden ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <button
      aria-label="Cerrar menú"
      onClick={onClose}
      className="absolute top-6 right-6 text-3xl text-hydra-dark"
    >
      <i className="fa-solid fa-times" />
    </button>
    {[
      ["Inicio", "inicio"],
      ["Servicios", "servicios"],
      ["Nosotros", "nosotros"],
      ["Galería", "galeria"],
    ].map(([label, id]) => (
      <button
        key={id}
        onClick={() => scrollToId(id)}
        className="text-2xl font-serif text-hydra-dark hover:text-hydra-pink"
      >
        {label}
      </button>
    ))}
    <button
      onClick={() => scrollToId("contacto")}
      className="px-8 py-3 bg-hydra-pink text-hydra-dark font-bold uppercase tracking-widest"
    >
      Agendar
    </button>
  </div>
);
