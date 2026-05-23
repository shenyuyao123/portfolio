"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "#", icon: "GH" },
  { label: "Twitter", href: "#", icon: "TW" },
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "Email", href: "mailto:hello@example.com", icon: "@" },
];

export default function Contact() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
        >
          <span className="text-sm font-semibold text-[var(--brand-magenta)] uppercase tracking-widest mb-3 block">
            Connect
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Let&apos;s
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] to-[var(--brand-coral)]">
              {" "}work together
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
            Got a project in mind? I&apos;d love to hear about it. Reach out and let&apos;s make something great.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="w-14 h-14 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--brand-magenta)] font-semibold text-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-16 text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Portfolio. Crafted with care.
        </p>
      </div>
    </section>
  );
}