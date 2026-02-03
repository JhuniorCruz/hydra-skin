import React from "react";

export const AboutSection = () => (
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
            En Hydra Skin, fusionamos técnicas dermatológicas de vanguardia con un ambiente diseñado para tu relajación
            absoluta. Creemos en el poder del cuidado personal no como un lujo, sino como una forma esencial de amor
            propio.
          </p>
          <p className="leading-loose mb-8 font-light text-gray-600">
            Nuestros especialistas están dedicado a entender las necesidades únicas de tu piel, creando protocolos
            personalizados que restauran tu brillo natural desde la primera sesión.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-8">
            <div className="flex flex-col gap-2 group">
              <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink transition-colors">
                <i className="fa-solid fa-droplet text-hydra-pink text-xl group-hover:text-hydra-dark transition-colors" />
              </div>
              <h4 className="font-serif text-lg text-hydra-dark mt-2">Hidratación Profunda</h4>
              <p className="text-xs uppercase tracking-wider text-gray-400">Tecnología Vortex</p>
            </div>
            <div className="flex flex-col gap-2 group">
              <div className="p-3 w-fit rounded-full bg-hydra-bg group-hover:bg-hydra-pink transition-colors">
                <i className="fa-brands fa-envira text-hydra-pink text-xl group-hover:text-hydra-dark transition-colors" />
              </div>
              <h4 className="font-serif text-lg text-hydra-dark mt-2">Bienestar Integral</h4>
              <p className="text-xs uppercase tracking-wider text-gray-400">Experiencia Sensorial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
