import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { instagramHandle } from "../data/gallery";

export const GallerySection = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!selectedItem) return undefined;
    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

  const modal = (
    <AnimatePresence>
      {selectedItem ? (
        <motion.div
          key="gallery-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={() => setSelectedItem(null)}
          style={{
            backgroundColor: "rgba(16, 16, 16, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl rounded-xl overflow-hidden bg-hydra-bg shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-md border border-hydra-dark/15 bg-hydra-bg/90 text-hydra-dark/70 hover:text-hydra-dark hover:border-hydra-dark/30 transition-colors flex items-center justify-center"
            >
              X
            </button>

            <div className="flex flex-col lg:flex-row max-h-[88vh] overflow-hidden">
              <div className="w-full lg:w-1/2 relative bg-hydra-dark/5">
                <img
                  src={selectedItem.before}
                  alt={`Antes - ${selectedItem.title}`}
                  className="w-full h-[35vh] lg:h-[75vh] object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-sm font-bold uppercase tracking-wide bg-white/90 text-hydra-dark rounded-md shadow-sm">
                  ANTES
                </span>
              </div>
              <div className="w-full lg:w-1/2 relative bg-hydra-dark/5 border-t lg:border-t-0 lg:border-l border-white/20">
                <img
                  src={selectedItem.after}
                  alt={`Despues - ${selectedItem.title}`}
                  className="w-full h-[35vh] lg:h-[75vh] object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-sm font-bold uppercase tracking-wide bg-hydra-pink/90 text-hydra-dark rounded-md shadow-sm">
                  DESPUÉS
                </span>
              </div>
            </div>

            <div className="bg-white p-6 flex justify-between items-center border-t border-gray-100">
              <h3 id="gallery-modal-title" className="text-xl sm:text-2xl font-serif text-hydra-dark">
                {selectedItem.title}
              </h3>
              <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Caso Real Hydra Skin</p>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <section id="galeria" className="py-24 bg-hydra-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center" data-aos="fade-up">
          <span className="text-sm font-bold uppercase tracking-wide mb-3 text-hydra-dark/70">Resultados reales</span>
          <h2 className="text-3xl font-serif mb-2 text-hydra-dark">Casos antes y despues</h2>
          <div className="w-12 h-1 bg-hydra-pink mb-4" />
          <p className="text-sm text-gray-600 max-w-xl mb-4">
            Evolucion visible de protocolos faciales y corporales compartidos con nuestra comunidad.
          </p>
          <a
            href="https://www.instagram.com/hydra.skin.aesthetic/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold uppercase tracking-wide hover:text-hydra-dark transition-colors flex items-center gap-2"
          >
            <i className="fa-brands fa-instagram text-lg text-hydra-pink" /> {instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer group hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-all"
              onClick={() => setSelectedItem(item)}
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
            >
              <div className="grid grid-cols-2 gap-px bg-hydra-beige/40 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img src={item.before} alt={`Antes - ${item.title}`} className="h-96 md:h-[26rem] w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-3 py-1 text-sm font-bold uppercase tracking-wide bg-white/90 text-hydra-dark rounded-md shadow-sm">
                    Antes
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img src={item.after} alt={`Despues - ${item.title}`} className="h-96 md:h-[26rem] w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-3 py-1 text-sm font-bold uppercase tracking-wide bg-hydra-pink text-hydra-dark rounded-md shadow-sm">
                    Despues
                  </span>

                  {/* Overlay icon to hint clickability */}
                  <div className="absolute inset-0 bg-hydra-dark/0 group-hover:bg-hydra-dark/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 duration-300">
                      <i className="fa-solid fa-expand text-hydra-dark text-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-gray-50">
                <div>
                  <p className="text-sm font-semibold text-hydra-dark transition-colors group-hover:text-hydra-pink">{item.title}</p>
                  <p className="text-xs text-gray-500">Haz clic para agrandar</p>
                </div>
                <i className="fa-solid fa-sparkles text-hydra-pink" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </section>
  );
};
