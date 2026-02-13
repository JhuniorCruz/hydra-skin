import React from "react";

export const FloatingWhatsAppButton = ({ phoneNumber }) => {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola Hydra Skin, quiero reservar una cita.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-4 right-4 z-50 md:hidden inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
    >
      <i className="fa-brands fa-whatsapp text-base" />
      <span>WhatsApp</span>
    </a>
  );
};
