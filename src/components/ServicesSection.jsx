import React, { useState } from "react";

export const ServicesSection = ({ services, onReserveService }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSelect = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="servicios" className="py-24 bg-hydra-beige relative" data-aos="fade-up">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(#252525 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-wide mb-3 block text-hydra-dark">Menu de Servicios</span>
          <h2 className="text-4xl font-serif text-hydra-dark">Rituales de Belleza</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const isActive = activeIndex === idx;

            return (
              <article
                key={svc.name}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => handleSelect(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(idx);
                  }
                }}
                className={`relative p-8 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] cursor-pointer group transition-colors transition-shadow duration-300 bg-hydra-bg hover:bg-hydra-dark hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] ${
                  isActive ? "bg-hydra-dark shadow-[0_20px_45px_rgba(0,0,0,0.18)]" : ""
                }`}
              >
                <div
                  className={`absolute top-0 right-0 bg-hydra-pink text-hydra-dark text-sm font-bold uppercase px-3 py-1 tracking-wide transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  Seleccionado
                </div>

                <div
                  className={`flex justify-between items-start mb-6 border-b pb-4 transition-colors ${
                    isActive ? "border-white/20" : "border-gray-200 group-hover:border-white/20"
                  }`}
                >
                  <div>
                    <h3 className={`text-xl font-serif transition-colors ${isActive ? "text-white" : "text-hydra-dark group-hover:text-white"}`}>
                      {svc.name}
                    </h3>
                    <p
                      className={`text-sm mt-1 uppercase tracking-wide transition-colors ${
                        isActive ? "text-white/50" : "text-gray-500 group-hover:text-white/50"
                      }`}
                    >
                      {svc.minutes} Minutos
                    </p>
                  </div>
                  <span className="font-bold text-lg text-hydra-pink">${svc.price}</span>
                </div>

                <div
                  className={`mb-6 overflow-hidden rounded-xl border ${
                    isActive
                      ? "border-white/20 bg-white/10"
                      : "border-gray-200 bg-white group-hover:border-white/20 group-hover:bg-white/10"
                  }`}
                >
                  {svc.image ? (
                    <img
                      src={svc.image}
                      alt={`Referencia ${svc.name}`}
                      className="h-56 md:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`h-56 md:h-64 w-full grid place-items-center text-sm uppercase tracking-wide ${
                        isActive ? "text-white/50" : "text-gray-500 group-hover:text-white/50"
                      }`}
                    >
                      Agrega imagen referencial
                    </div>
                  )}
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${isActive ? "text-white/80" : "text-gray-600 group-hover:text-white/80"}`}>
                  {svc.description}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                    onReserveService?.(svc.name);
                  }}
                  className={`w-full py-3 text-sm uppercase tracking-wide font-bold transition-colors ${
                    isActive
                      ? "bg-hydra-pink text-hydra-dark hover:brightness-110"
                      : "border border-hydra-dark text-hydra-dark group-hover:border-hydra-pink group-hover:bg-hydra-pink group-hover:text-hydra-dark"
                  }`}
                >
                  Reservar
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
