import React from "react";
import { instagramHandle } from "../data/gallery";

export const GallerySection = ({ items }) => (
  <section id="galeria" className="py-24 bg-hydra-bg">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center mb-12 text-center" data-aos="fade-up">
        <span className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-hydra-pink">Transformaciones reales</span>
        <h2 className="text-3xl font-serif mb-2 text-hydra-dark">Estética Visual</h2>
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
          <i className="fa-brands fa-instagram text-lg" /> {instagramHandle}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={item.title} className="bg-white shadow-lg rounded-md overflow-hidden" data-aos="zoom-in" data-aos-delay={idx * 80}>
            <div className="grid grid-cols-2 gap-px bg-hydra-beige/40">
              <div className="relative">
                <img src={item.before} alt={`Antes - ${item.title}`} className="h-80 w-full object-cover" />
                <span className="absolute top-2 left-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] bg-white/90 text-hydra-dark rounded-full shadow-sm">
                  Antes
                </span>
              </div>
              <div className="relative">
                <img src={item.after} alt={`Después - ${item.title}`} className="h-80 w-full object-cover" />
                <span className="absolute top-2 left-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] bg-hydra-pink text-hydra-dark rounded-full shadow-sm">
                  Después
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-hydra-dark">{item.title}</p>
                <p className="text-xs text-gray-500">Resultados Hydra Skin</p>
              </div>
              <i className="fa-solid fa-sparkles text-hydra-pink" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
