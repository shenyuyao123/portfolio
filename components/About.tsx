"use client";

import { motion } from "framer-motion";

const skills = [
  "UI/UX Design",
  "React & Next.js",
  "Motion Graphics",
  "Photography",
  "Video Editing",
  "Brand Identity",
  "3D Modeling",
  "Creative Direction",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="text-sm font-semibold text-[var(--brand-magenta)] uppercase tracking-widest mb-3 block">
            About
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
            A bit about
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] to-[var(--brand-coral)]">
              {" "}me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            className="md:col-span-3 space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              I&apos;m a multidisciplinary creative with a passion for blending design and technology.
              With over 5 years of experience crafting digital products, I focus on creating work that
              feels alive—full of motion, color, and personality.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              When I&apos;m not designing or coding, you&apos;ll find me behind a camera, experimenting
              with new visual styles, or exploring the intersection of art and code.
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3 className="font-display text-lg font-semibold mb-4 text-[var(--text-primary)]">Skills & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemAnim}
                  className="px-3.5 py-2 bg-white rounded-lg text-sm font-medium text-[var(--text-secondary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--brand-magenta)] transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}