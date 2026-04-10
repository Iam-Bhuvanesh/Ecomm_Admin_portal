import { Link } from "react-router-dom";

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

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
}

const SimilarProducts = ({ products, currentProductId }: SimilarProductsProps) => {
  // Filter out the current product and take only first 6 similar ones
  const similarOnes = products
    .filter((p) => p._id !== currentProductId)
    .slice(0, 6);

  if (similarOnes.length === 0) return null;

  return (
    <section className="py-12 border-t border-muted">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-8">
          SIMILAR PRODUCTS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {similarOnes.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {(product.discount || product.isRecent) && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.discount && (
                      <span className="bg-[#881337] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {product.discount} OFF
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
