import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export const ServicesSection = ({ services, onReserveService }) => {
  const [selectedService, setSelectedService] = useState(null);
  const selectedServiceDescription =
    selectedService?.detailedDescription?.trim() || selectedService?.description || "";

  useEffect(() => {
    if (!selectedService) return undefined;
    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedService(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedService]);

  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const modal = (
    <AnimatePresence>
      {selectedService ? (
        <motion.div
          key="service-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={() => setSelectedService(null)}
          style={{
            backgroundColor: "rgba(16, 16, 16, 0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-hydra-bg shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full border border-hydra-dark/15 bg-hydra-bg/90 text-hydra-dark/70 hover:text-hydra-dark hover:border-hydra-dark/30 transition-colors"
            >
              X
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] max-h-[88vh]">
              <div className="relative bg-hydra-dark/5">
                {selectedService.image ? (
                  <img
                    src={selectedService.image}
                    alt={`Detalle ${selectedService.name}`}
                    className="w-full h-[40vh] sm:h-[46vh] lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-[40vh] sm:h-[46vh] lg:h-full grid place-items-center text-sm uppercase tracking-wide text-gray-500">
                    Agrega imagen referencial
                  </div>
                )}
              </div>

                <div className="flex flex-col p-6 sm:p-8 lg:p-10 overflow-y-auto">
                <p className="text-[11px] uppercase tracking-[0.2em] text-hydra-dark/50 mb-4">Servicio destacado</p>

                <h3 id="service-modal-title" className="text-3xl sm:text-4xl font-serif text-hydra-dark leading-tight mb-5">
                  {selectedService.name}
                </h3>

                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 text-xs uppercase tracking-wide rounded-full bg-hydra-dark/5 text-hydra-dark/70">
                    {selectedService.minutes} minutos
                  </span>
                  <span className="px-3 py-1 text-xs uppercase tracking-wide rounded-full bg-hydra-pink/30 text-hydra-dark">
                    ${selectedService.price}
                  </span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-hydra-dark/80">
                  {selectedServiceDescription}
                </p>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      onReserveService?.(selectedService.name);
                      setSelectedService(null);
                    }}
                    className="w-full py-3.5 px-6 bg-hydra-pink text-hydra-dark uppercase tracking-wider text-sm font-semibold rounded-xl hover:brightness-105 transition-all"
                  >
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

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
          {services.map((svc) => (
            <button
              key={svc.name}
              type="button"
              onClick={() => openServiceModal(svc)}
              className="relative text-left p-8 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] cursor-pointer group transition-colors transition-shadow duration-300 bg-hydra-bg hover:bg-hydra-dark hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-hydra-pink focus-visible:ring-offset-2 focus-visible:ring-offset-hydra-beige"
            >
              <div className="flex justify-between items-start mb-6 border-b pb-4 transition-colors border-gray-200 group-hover:border-white/20">
                <div>
                  <h3 className="text-xl font-serif transition-colors text-hydra-dark group-hover:text-white">{svc.name}</h3>
                  <p className="text-sm mt-1 uppercase tracking-wide transition-colors text-gray-500 group-hover:text-white/50">
                    {svc.minutes} Minutos
                  </p>
                </div>
                <span className="font-bold text-lg text-hydra-pink">${svc.price}</span>
              </div>

              <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white group-hover:border-white/20 group-hover:bg-white/10">
                {svc.image ? (
                  <img
                    src={svc.image}
                    alt={`Referencia ${svc.name}`}
                    className="h-56 md:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-56 md:h-64 w-full grid place-items-center text-sm uppercase tracking-wide text-gray-500 group-hover:text-white/50">
                    Agrega imagen referencial
                  </div>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-6 text-gray-600 group-hover:text-white/80">{svc.description}</p>

              <span className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-hydra-dark group-hover:text-hydra-pink">
                Ver detalle
              </span>
            </button>
          ))}
        </div>
      </div>
      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </section>
  );
};
