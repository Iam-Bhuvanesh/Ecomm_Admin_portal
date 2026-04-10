import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.png";

const slides = [
  {
    image: hero1,
    subtitle: "SOFTNESS IN EVERY THREAD",
    title: "Curated ethnic styles",
    cta: "SHOP NOW",
  },
  {
    image: hero2,
    subtitle: "APPLICABLE ON ALL TOPWEAR STYLES",
    title: "This Season's New Arrivals",
    offer: "Buy 2 Save ₹200 · Buy 3 Save ₹500",
    cta: "SHOP NOW",
  },
  {
    image: hero3,
    subtitle: "RADIANT AND ELEGANT",
    title: "Premium Contemporary ethnic",
    cta: "DISCOVER MORE",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full flex-shrink-0 overflow-hidden">
            <img
              src={slide.image}
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
                {slide.cta}
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
