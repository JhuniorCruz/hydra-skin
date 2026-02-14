import React from "react";

export const AboutSection = () => (
  <section id="nosotros" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10 overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
              alt="Profesional realizando protocolo facial"
              className="w-full h-auto object-cover grayscale-[8%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-hydra-beige -z-0" />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2 text-hydra-dark/75">
            <span className="w-8 h-px bg-hydra-pink" /> Direccion clinica y metodo
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-hydra-dark leading-tight">
            Cuidado experto
            <br />
            <span className="italic text-hydra-dark/70">centrado en tu piel</span>
          </h2>
          <p className="leading-loose mb-8 font-light text-gray-600">
            En Hydra Skin trabajamos con protocolos personalizados segun evaluacion previa, historial y objetivos
            reales de cada paciente. Cada sesion combina precision tecnica con una experiencia de bienestar premium.
          </p>
          <p className="leading-loose mb-8 font-light text-gray-600">
            Nuestro enfoque prioriza seguridad, consistencia y seguimiento post sesion para que avances con claridad
            en cada etapa de tu tratamiento.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-8">
            <div className="flex flex-col gap-2 group">
              <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink/30 transition-colors">
                <i className="fa-solid fa-stethoscope text-hydra-dark text-xl transition-colors" />
              </div>
              <h4 className="font-serif text-lg text-hydra-dark mt-2">Evaluacion personalizada</h4>
              <p className="text-xs uppercase tracking-wider text-gray-400">Diagnostico y protocolo a medida</p>
            </div>
            <div className="flex flex-col gap-2 group">
              <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink/30 transition-colors">
                <i className="fa-solid fa-shield-heart text-hydra-dark text-xl transition-colors" />
              </div>
              <h4 className="font-serif text-lg text-hydra-dark mt-2">Seguimiento real</h4>
              <p className="text-xs uppercase tracking-wider text-gray-400">Control post tratamiento 48h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
