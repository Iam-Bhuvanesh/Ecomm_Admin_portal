import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosters } from "@/lib/api";

interface Poster {
  imageUrl: string;
  subtitle?: string;
  title: string;
  offer?: string;
  cta?: string;
}

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const { data: slides = [], isLoading, isError } = useQuery<Poster[]>({
    queryKey: ['posters'],
    queryFn: fetchPosters
  });

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (isLoading) return <div className="h-[40vh] sm:h-[65vh] w-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">Loading carousel...</div>;
  if (isError || slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full flex-shrink-0 overflow-hidden">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className={`w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] object-cover object-top ${
                i === current ? "animate-hero-zoom-out" : "scale-110"
              }`}
              width={1920}
              height={800}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            <div className="absolute inset-0 bg-foreground/20" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24">
              {slide.offer && (
                <p className="text-primary-foreground text-xs md:text-sm tracking-widest mb-2 font-body">
                  {slide.offer}
                </p>
              )}
              <p className="text-primary-foreground/80 text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-body">
                {slide.subtitle}
              </p>
              <h1 className="font-heading italic text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 max-w-lg">
                {slide.title}
              </h1>
              <a
                href="#"
                className="inline-block w-fit border border-primary-foreground text-primary-foreground px-6 py-2.5 text-xs md:text-sm tracking-widest font-medium hover:bg-primary-foreground hover:text-foreground transition-all"
              >
                {slide.cta || 'SHOP NOW'}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all ${
              i === current ? "w-8 bg-primary-foreground" : "w-4 bg-primary-foreground/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
