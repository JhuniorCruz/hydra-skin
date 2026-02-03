import React from "react";

export const StatsSection = ({ counts, statsRef, stats }) => (
  <section ref={statsRef} className="py-20 bg-hydra-bg" data-aos="fade-up">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-hydra-pink mb-4">Experiencia Comprobada</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border-b-2 border-hydra-pink"
            >
              <span className="text-3xl font-serif text-hydra-dark">
                {counts[idx]}
                {stat.suffix}
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-2 text-gray-500 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
