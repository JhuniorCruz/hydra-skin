import React from "react";

export const ContactSection = ({ formData, handleFieldChange, handleSubmit, btnLabel, services = [] }) => (
  <section id="contacto" className="py-24 bg-hydra-dark text-hydra-bg relative" data-aos="fade-up">
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-wide mb-3 block text-hydra-pink">Agenda</span>
            <h2 className="text-4xl font-serif mb-6 text-white">Comienza tu protocolo de cuidado</h2>
            <p className="font-light leading-relaxed text-white/80">
              Comparte tus datos y tu objetivo principal. Nuestro equipo confirma tu evaluacion personalizada y te
              orienta en el mejor tratamiento para tu piel.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot text-hydra-pink" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white">Ubicacion</h4>
                <p className="text-white/60 text-sm mt-1">
                  Av. Pacifico 230, Urb. Buenos Aires
                  <br />
                  Nuevo Chimbote, Ancash - Peru
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                <i className="fa-solid fa-phone text-hydra-pink" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white">Telefono</h4>
                <p className="text-white/60 text-sm mt-1">+51 987 654 321</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-hydra-pink rounded-full flex items-center justify-center shrink-0">
                <i className="fa-solid fa-envelope text-hydra-pink" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white">Email</h4>
                <p className="text-white/60 text-sm mt-1">hola@hydraskin.pe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 bg-hydra-bg p-8 md:p-12 rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.12)] relative text-hydra-dark">
          <div className="absolute top-0 left-0 w-full h-2 bg-hydra-pink rounded-t-lg" />
          <form id="bookingForm" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide opacity-60">Nombre</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide opacity-60">Telefono</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleFieldChange}
                  className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                  placeholder="(51) 987 654 321"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide opacity-60">Email</label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide opacity-60">Servicio</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleFieldChange}
                  className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors text-gray-600"
                >
                  <option value="">Seleccionar...</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide opacity-60">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFieldChange}
                  className="w-full p-4 border-b-2 border-gray-300 bg-white focus:outline-none focus:border-hydra-pink transition-colors text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-hydra-pink text-hydra-dark font-bold py-5 rounded-md shadow-[0_10px_24px_rgba(0,0,0,0.18)] uppercase tracking-wide text-sm mt-4 transition-all hover:brightness-110"
            >
              {btnLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);
