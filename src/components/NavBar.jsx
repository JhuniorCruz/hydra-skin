import React from "react";

const navLinks = [
  ["Inicio", "inicio"],
  ["Metodo", "expertise"],
  ["Servicios", "servicios"],
  ["FAQ", "faq"],
  ["Galeria", "galeria"],
];

export const NavBar = ({ navSolid, scrollToId, onMenuToggle }) => {
  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-500 ${
        navSolid
          ? "bg-gradient-to-b from-[#f7f6f4]/95 to-[#f0efed]/80 py-3 shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-[#0e0c0c]/90 via-black/50 to-transparent py-4 shadow-none"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center gap-4">
        <button onClick={() => scrollToId("inicio")} className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 overflow-hidden ring-1 ring-black/5">
            <img src="/assets/logo-hydra.png" alt="Hydra Skin" className="object-contain w-full h-full" />
          </div>
          <div className="flex flex-col text-left">
            <span
              className={`text-xl font-serif font-bold tracking-widest leading-none ${
                navSolid ? "text-hydra-dark" : "text-white drop-shadow"
              }`}
            >
              HYDRA SKIN
            </span>
            <span className="text-sm tracking-wide uppercase mt-1 font-bold text-hydra-dark/70">Clinical Aesthetics</span>
          </div>
        </button>

        <div className="hidden md:flex flex-1 items-center justify-center">
          {navSolid ? (
            <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-white/95 shadow-[0_14px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur-md">
              {navLinks.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="text-sm font-semibold text-hydra-dark hover:text-hydra-pink transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {navLinks.map(([label, id]) => (
                <button key={id} onClick={() => scrollToId(id)} className="hover:text-hydra-pink transition-colors">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollToId("contacto")}
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all ${
              navSolid
                ? "bg-hydra-pink text-hydra-dark hover:translate-y-[-1px]"
                : "bg-hydra-pink text-hydra-dark hover:brightness-105"
            }`}
          >
            Agendar evaluacion
          </button>
        </div>

        <button
          aria-label="Abrir menu"
          onClick={onMenuToggle}
          className={`md:hidden text-2xl focus:outline-none ${navSolid ? "text-hydra-dark" : "text-white"}`}
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>
    </nav>
  );
};
