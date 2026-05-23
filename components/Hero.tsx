"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create floating particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 1,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      time += 0.005;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        const hue = (time * 100 + p.x * 0.2) % 360;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${hue}, 70%, 70%, ${p.alpha})`;
        ctx!.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white -z-10" />

      <div className="text-center px-6 max-w-3xl">
        <div className="inline-block mb-8">
          <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-[var(--brand-magenta)] to-[var(--brand-coral)] flex items-center justify-center text-white text-5xl font-bold shadow-xl animate-float">
            M
          </div>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] via-[var(--brand-coral)] to-[var(--brand-mint)] animate-gradient bg-[length:200%_200%]">
            Creative
          </span>
          <br />
          <span className="text-[var(--text-primary)]">Portfolio</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
          Designer, developer, and visual storyteller. I craft delightful digital experiences
          and capture moments through lens and code.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--brand-magenta)] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            View My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[var(--text-primary)] font-semibold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            About Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}