import { listMedia } from "@/app/actions/manage";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import VideoGallery from "@/components/VideoGallery";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const media = await listMedia();

  return (
    <main>
      <Hero />
      <About />

      <section id="gallery" className="py-24 px-6 bg-[var(--surface-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-semibold text-[var(--brand-magenta)] uppercase tracking-widest mb-3 block">
              Gallery
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Photo
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] to-[var(--brand-coral)]">
                {" "}Collection
              </span>
            </h2>
          </div>
          <PhotoGallery items={media} />
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-semibold text-[var(--brand-magenta)] uppercase tracking-widest mb-3 block">
              Reel
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Video
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-magenta)] to-[var(--brand-coral)]">
                {" "}Showcase
              </span>
            </h2>
          </div>
          <VideoGallery items={media} />
        </div>
      </section>

      <Timeline />
      <Contact />
    </main>
  );
}