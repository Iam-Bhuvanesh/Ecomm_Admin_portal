import { useState, useRef } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  isRecent?: boolean;
  images: string[];
  category?: string;
}

const NewArrivals = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['new-arrivals'],
    queryFn: fetchProducts
  });

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardElement = scrollRef.current.children[0] as HTMLElement;
      if (!cardElement) return;
      const cardWidth = cardElement.clientWidth;
      const index = Math.round(scrollPosition / cardWidth);
      if (index >= 0 && index < products.length) {
        setActiveIndex(index);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.children[0] as HTMLElement;
      if (!cardElement) return;
      const cardWidth = cardElement.clientWidth;
      const gap = 12; // Corresponding to gap-3 (12px)
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

  if (isLoading) return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="h-8 w-48 bg-muted animate-pulse mx-auto mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-xl" />)}
      </div>
    </section>
  );

  if (isError || products.length === 0) return null;

  return (
    <section className="py-10 md:py-16 w-full max-w-7xl mx-auto">
      <div className="text-center px-4 mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-normal mb-3 text-[#1a1a1a]">New Arrivals</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
          Discover the latest trends and fresh picks in our new collection.
        </p>
      </div>

      <div className="relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((product) => (
            <div 
              key={product._id} 
              className="w-[45vw] sm:w-[35vw] md:w-full snap-start shrink-0 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={product.images && product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Left Tags */}
                <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
                  {product.discount && (
                    <span className="bg-[#ef4444] text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                      -{product.discount}
                    </span>
                  )}
                  {product.isRecent && (
                    <span className="bg-[#3b82f6] text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                      New
                    </span>
                  )}
                </div>

                {/* Bottom Right Actions */}
                <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                  <button className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white hover:scale-105 transition-all flex items-center justify-center">
                    <Heart className="w-[18px] h-[18px] text-gray-700" />
                  </button>
                  <button className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white hover:scale-105 transition-all flex items-center justify-center">
                    <ShoppingBag className="w-[18px] h-[18px] text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center">
                <h3 className="text-sm text-gray-800 font-medium">{product.name}</h3>
                <div className="mt-1.5 flex items-center justify-center gap-2">
                  <span className="text-[#881337] font-medium text-[15px]">Rs. {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-[13px]">Rs. {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                activeIndex === idx ? "bg-gray-800" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
