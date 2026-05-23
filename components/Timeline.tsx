"use client";

import { motion } from "framer-motion";

const timeline = [
  { year: "2026", title: "Senior Creative Designer", org: "Studio Nine", desc: "Leading brand identity and motion design projects for global clients." },
  { year: "2024", title: "Creative Developer", org: "Pixelcraft", desc: "Built interactive web experiences blending design and frontend engineering." },
  { year: "2022", title: "Freelance Designer", org: "Self-employed", desc: "Collaborated with startups on branding, web design, and visual content." },
  { year: "2020", title: "Junior Designer", org: "Bright Media", desc: "Started my career crafting social media visuals and short-form video content." },
];

export default function Timeline() {
  return (
    <section className="py-24 px-6 bg-[var(--surface-secondary)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="text-sm font-semibold text-[var(--brand-magenta)] uppercase tracking-widest mb-3 block">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 leading-tight">
            Experience &
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] to-[var(--brand-coral)]">
              {" "}Timeline
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--brand-magenta-light)] md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--brand-magenta)] rounded-full -translate-x-1/2 shadow-md z-10 ring-4 ring-[var(--surface-secondary)]" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <span className="text-xs font-bold text-[var(--brand-magenta)] uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl font-bold mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] font-medium mb-2">{item.org}</p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}