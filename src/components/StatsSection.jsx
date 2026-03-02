import React from "react";

export const StatsSection = ({ counts, statsRef, stats }) => (
  <section ref={statsRef} className="py-20 bg-hydra-bg" data-aos="fade-up">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase tracking-wide text-hydra-dark/70 mb-4">Resultados con respaldo</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.12)] border-b-2 border-hydra-dark/10"
            >
              <span className="text-3xl font-serif text-hydra-dark">
                {counts[idx]}
                {stat.suffix}
              </span>
              <span className="text-sm uppercase tracking-wide mt-2 text-gray-500 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
