import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "@/lib/api";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import OfferBanner from "@/components/OfferBanner";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

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

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['category', slug],
    queryFn: () => fetchProductsByCategory(slug || ""),
    enabled: !!slug
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const displayTitle = slug ? slug.replace(/-/g, ' ').toUpperCase() : "Category";

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20 items-center">
        <div className="h-8 w-48 bg-muted animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl px-4">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft size={14} />
            HOME
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{displayTitle}</span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">{displayTitle}</h1>
        <p className="text-muted-foreground mt-1">{products.length} Products</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isRecent && (
                    <div className="absolute top-2 left-2 bg-[#881337] text-white text-[10px] md:text-xs font-semibold px-2 py-1 tracking-wider rounded">
                      NEW
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
                    <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="text-xs md:text-sm font-medium leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm md:text-base font-bold">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-[10px] md:text-xs font-semibold text-[#881337]">
                        ({product.discount} OFF)
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
