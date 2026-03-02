import React from "react";

const credentials = [
  "Certificacion en estetica avanzada - [Institucion]",
  "Especializacion en protocolos faciales - [Institucion]",
  "Entrenamiento en aparatologia estetica - [Institucion]",
  "Actualizacion anual en seguridad clinica - [Ano]",
];

const trustPillars = [
  {
    title: "Evaluacion personalizada previa",
    description: "Cada protocolo inicia con analisis de piel, objetivos y contraindicaciones para tomar decisiones seguras.",
  },
  {
    title: "Protocolos por fototipo y objetivo",
    description: "La intensidad, tecnica y frecuencia se ajustan segun respuesta de piel y meta de tratamiento.",
  },
  {
    title: "Seguimiento post sesion 48h",
    description: "Acompaniamiento posterior con recomendaciones claras para maximizar resultados y reducir riesgos.",
  },
];

export const ExpertiseSection = () => (
  <section id="expertise" className="py-24 bg-white" data-aos="fade-up">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <article className="rounded-lg border border-hydra-dark/10 bg-hydra-bg p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <span className="text-xs uppercase tracking-[0.22em] text-hydra-dark/50 font-semibold">Autoridad clinica</span>
            <h2 className="text-4xl md:text-5xl font-serif text-hydra-dark mt-4 mb-6">
              Direccion profesional y experiencia comprobable
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-hydra-dark/80 mb-6">
              <span className="font-semibold">[Nombre del Profesional]</span> - [Especialidad principal], con formacion
              en [Area de certificacion] y enfoque en protocolos personalizados para salud y estetica de la piel.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-hydra-dark/75">
              Registro profesional: <span className="font-semibold">[Colegio / Registro]</span>
              <br />
              Anios de experiencia: <span className="font-semibold">[X+]</span>
            </p>
          </article>

          <article className="rounded-lg border border-hydra-dark/10 p-8 md:p-10">
            <h3 className="text-lg uppercase tracking-[0.18em] text-hydra-dark/60 font-semibold mb-6">Credenciales y certificaciones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((credential) => (
                <div key={credential} className="rounded-md bg-hydra-bg border border-hydra-dark/10 px-4 py-3">
                  <p className="text-sm leading-relaxed text-hydra-dark/80">{credential}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="mt-10 rounded-lg border border-hydra-dark/10 p-8 md:p-10">
          <h3 className="text-3xl font-serif text-hydra-dark mb-8">Por que elegirnos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-md bg-hydra-bg p-6 border border-hydra-dark/10">
                <h4 className="text-lg font-semibold text-hydra-dark mb-3">{pillar.title}</h4>
                <p className="text-sm leading-relaxed text-hydra-dark/75">{pillar.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  </section>
);
