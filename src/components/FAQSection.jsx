import React, { useState } from "react";

const faqs = [
  {
    question: "Los tratamientos duelen?",
    answer:
      "La mayoria de protocolos generan molestias leves y tolerables. Antes de iniciar, explicamos la sensacion esperada y ajustamos la intensidad segun tu tolerancia.",
  },
  {
    question: "Cuantas sesiones necesito para ver resultados?",
    answer:
      "Depende de tu objetivo y estado de piel. En la evaluacion definimos una ruta sugerida de sesiones y tiempos estimados para resultados visibles.",
  },
  {
    question: "Cuanto duran los resultados?",
    answer:
      "La duracion varia por tratamiento y habitos de cuidado en casa. Te entregamos un plan de mantenimiento para extender resultados.",
  },
  {
    question: "Habra enrojecimiento o inflamacion despues?",
    answer:
      "Algunos protocolos pueden causar enrojecimiento temporal. Siempre indicamos que es normal, cuanto suele durar y que señales requieren seguimiento.",
  },
  {
    question: "Puedo maquillarme, hacer ejercicio o ir al sol despues?",
    answer:
      "Cada tratamiento tiene indicaciones especificas post sesion. Te damos recomendaciones claras sobre maquillaje, actividad fisica y fotoproteccion.",
  },
  {
    question: "Que cuidados post tratamiento debo seguir?",
    answer:
      "Incluyen limpieza suave, hidratacion, protector solar y evitar activos irritantes por el tiempo indicado. El protocolo exacto se personaliza en tu sesion.",
  },
  {
    question: "Hay contraindicaciones si estoy embarazada o tomo medicacion?",
    answer:
      "Si. Por seguridad, evaluamos embarazo, lactancia, medicamentos activos y condiciones dermatologicas antes de recomendar cualquier procedimiento.",
  },
  {
    question: "El tratamiento sirve para mi tipo de piel?",
    answer:
      "Trabajamos por fototipo, sensibilidad y objetivo. No usamos protocolos estandar para todos; cada plan se adapta a tu caso.",
  },
  {
    question: "Puedo hacerme un tratamiento si tengo un evento pronto?",
    answer:
      "Si, pero depende del tiempo disponible y del tratamiento elegido. Recomendamos agendar evaluacion para seleccionar una opcion con minimo downtime.",
  },
  {
    question: "Que incluye el precio de cada sesion?",
    answer:
      "Incluye evaluacion del caso, aplicacion del protocolo en cabina y guia post sesion. Te indicamos extras opcionales antes de confirmar cualquier reserva.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wide mb-3 block text-hydra-dark/70">FAQ clinico</span>
            <h2 className="text-4xl font-serif text-hydra-dark">Preguntas frecuentes antes de tu sesion</h2>
            <p className="text-sm text-hydra-dark/70 mt-4 max-w-2xl mx-auto">
              Respuestas claras para tomar decisiones informadas sobre seguridad, resultados y cuidados posteriores.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question} className="rounded-lg border border-hydra-dark/10 bg-hydra-bg/70 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                    className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-hydra-dark">{faq.question}</span>
                    <span
                      className={`w-8 h-8 rounded-md grid place-items-center text-sm font-semibold transition-colors ${isOpen ? "bg-hydra-pink text-hydra-dark" : "bg-hydra-dark/10 text-hydra-dark/70"
                        }`}
                    >
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  <AnimateHeight isOpen={isOpen}>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-hydra-dark/75">{faq.answer}</p>
                  </AnimateHeight>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimateHeight = ({ isOpen, children }) => (
  <div
    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
  >
    <div className="overflow-hidden">{children}</div>
  </div>
);
