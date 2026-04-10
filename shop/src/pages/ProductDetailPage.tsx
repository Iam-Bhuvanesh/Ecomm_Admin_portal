import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft, Truck, RotateCcw, Shield, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "@/lib/api";
import ProductGallery from "@/components/ProductGallery";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import OfferBanner from "@/components/OfferBanner";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SimilarProducts from "@/components/SimilarProducts";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  isRecent?: boolean;
  images: string[];
  category?: string;
  description?: string;
  sizes?: string[];
  gender?: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id || ""),
    enabled: !!id
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#881337]"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-[#881337] font-semibold underline">Back to Home</Link>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.success("Added to bag!", {
      description: `${product.name} ${selectedSize ? `- Size ${selectedSize}` : ""}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">
          <Link to="/" className="hover:text-foreground transition-colors">HOME</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/category/${product.category.toLowerCase().replace(/ /g, '-')}`} className="hover:text-foreground transition-colors">
                {product.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Image Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{product.category}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#881337]">
                    ({product.discount} OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Inclusive of all taxes</p>

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm tracking-widest uppercase">Select Size</h3>
                  <button className="text-[10px] font-bold text-[#881337] tracking-widest uppercase hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "border-[#881337] bg-[#881337] text-white"
                          : "border-gray-200 hover:border-[#881337] text-gray-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToBag}
                className="flex-1 h-14 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold text-xs tracking-[0.2em] rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-all uppercase"
              >
                ADD TO BAG
              </button>
              <button
                className="flex-1 h-14 bg-[#881337] text-white font-bold text-xs tracking-[0.2em] rounded-sm hover:bg-[#6c0f2c] transition-all uppercase"
              >
                BUY NOW
              </button>
            </div>

            {/* Delivery */}
            <div className="pt-4">
              <h3 className="font-bold text-sm tracking-widest uppercase mb-3">Check Delivery</h3>
              <div className="flex rounded-sm border border-gray-200 overflow-hidden bg-gray-50/50 focus-within:border-[#881337] transition-colors">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter pincode"
                  className="flex-1 px-4 py-3 text-sm bg-transparent outline-none font-medium"
                />
                <button className="px-6 text-xs font-bold text-[#881337] tracking-widest uppercase hover:text-[#6c0f2c] transition-colors">
                  CHECK
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck size={20} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={20} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">7 Days Return</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <Banknote size={20} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">COD Available</span>
              </div>
            </div>

            {/* Accordion sections */}
            <Accordion type="single" collapsible className="w-full pt-4 border-t">
              <AccordionItem value="details" className="border-b">
                <AccordionTrigger className="font-bold text-xs tracking-widest uppercase py-4">
                  PRODUCT DETAILS
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-600 pb-4">
                   {product.description || "No description available for this product."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="wash" className="border-b">
                <AccordionTrigger className="font-bold text-xs tracking-widest uppercase py-4">
                  WASH AND CARE
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pb-4">
                   Hand wash or machine wash in cold water. Do not bleach. Dry in shade. Iron on medium heat.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <SimilarProducts 
          products={allProducts} 
          currentProductId={product._id} 
        />
      </div>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
};

export default ProductDetailPage;
