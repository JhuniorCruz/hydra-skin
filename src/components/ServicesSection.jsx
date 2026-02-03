import React from "react";

export const ServicesSection = ({ services }) => (
  <section id="servicios" className="py-24 bg-hydra-beige relative" data-aos="fade-up">
    <div
      className="absolute inset-0 opacity-10"
      style={{ backgroundImage: "radial-gradient(#252525 1px, transparent 1px)", backgroundSize: "20px 20px" }}
    />

    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block text-hydra-dark">Menú de Servicios</span>
        <h2 className="text-4xl font-serif text-hydra-dark">Rituales de Belleza</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((svc, idx) => (
          <div
            key={svc.name}
            className={`p-8 shadow-lg cursor-pointer group transition-transform duration-500 ${
              svc.featured ? "bg-hydra-dark -translate-y-4 shadow-2xl relative" : "bg-hydra-bg hover:-translate-y-2"
            }`}
            data-aos="fade-up"
            data-aos-delay={svc.featured ? 80 : idx * 50}
          >
            {svc.featured && (
              <div className="absolute top-0 right-0 bg-hydra-pink text-hydra-dark text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
                Más Popular
              </div>
            )}

            <div
              className={`flex justify-between items-start mb-6 border-b pb-4 ${
                svc.featured ? "border-white/20" : "border-gray-200"
              }`}
            >
              <div>
                <h3
                  className={`text-xl font-serif transition-colors ${
                    svc.featured ? "text-white group-hover:text-hydra-pink" : "text-hydra-dark group-hover:text-hydra-pink"
                  }`}
                >
                  {svc.name}
                </h3>
                <p className={`text-xs mt-1 uppercase tracking-wide ${svc.featured ? "text-white/50" : "text-gray-500"}`}>
                  {svc.minutes} Minutos
                </p>
              </div>
              <span className={`font-bold text-lg ${svc.featured ? "text-hydra-pink" : "text-hydra-pink"}`}>
                ${svc.price}
              </span>
            </div>

            <p className={`text-sm leading-relaxed mb-6 ${svc.featured ? "text-white/80" : "text-gray-600"}`}>
              {svc.description}
            </p>

            <button
              className={`w-full py-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                svc.featured
                  ? "bg-hydra-pink text-hydra-dark hover:brightness-110"
                  : "border border-hydra-dark text-hydra-dark hover:bg-hydra-dark hover:text-hydra-pink"
              }`}
            >
              {svc.featured ? "Reservar" : "Detalles"}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
