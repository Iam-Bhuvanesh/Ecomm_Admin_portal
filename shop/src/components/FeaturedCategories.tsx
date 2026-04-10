import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCategories } from "@/lib/api";
import "./FeaturedCategories.css";

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
  description?: string;
  slug?: string;
}

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [animatingClass, setAnimatingClass] = useState<"next" | "prev" | "">("");
  const runTimeOut = useRef<NodeJS.Timeout | null>(null);
  const timeRunning = 1500;

  const { data: fetchedData = [], isLoading, isError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Sync fetched data with local state for carousel manipulation
  useEffect(() => {
    if (fetchedData.length > 0 && localCategories.length === 0) {
      setLocalCategories(fetchedData.map(cat => ({
        ...cat,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        description: cat.description || "Discover our latest collection. Stylish and comfortable fits for every occasion."
      })));
    }
  }, [fetchedData, localCategories.length]);

  const handleNext = () => {
    if (animatingClass !== "" || localCategories.length === 0) return;
    
    setLocalCategories((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
    
    setAnimatingClass("next");
    resetAutoRun();
  };

  const handlePrev = () => {
    if (animatingClass !== "" || localCategories.length === 0) return;
    
    setLocalCategories((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
    
    setAnimatingClass("prev");
    resetAutoRun();
  };

  const handleThumbnailClick = (index: number) => {
    if (index === 0 || animatingClass !== "" || localCategories.length === 0) return;
    
    setLocalCategories((prev) => {
      const newItems = [...prev];
      const shifted = newItems.splice(0, index);
      return [...newItems, ...shifted];
    });
    
    setAnimatingClass("next");
    resetAutoRun();
  };

  const resetAutoRun = () => {
    if (runTimeOut.current) clearTimeout(runTimeOut.current);
    
    runTimeOut.current = setTimeout(() => {
      setAnimatingClass("");
    }, timeRunning);
  };

  if (isLoading) return <div className="py-20 text-center text-muted-foreground animate-pulse">Loading categories...</div>;
  if (isError || localCategories.length === 0) return null;

  return (
    <div className={`featured-carousel ${animatingClass}`}>
      <div className="list">
        {localCategories.map((cat) => (
          <div key={cat._id} className="item">
            <div className="main-img-container">
               <img src={cat.imageUrl} alt={cat.name} className="main-img" />
            </div>
            <div className="content">
              <div className="author">GRIDOX</div>
              <div className="title">CATEGORIES</div>
              <div className="topic">{cat.name}</div>
              <div className="des">{cat.description}</div>
              <div className="buttons">
                <button onClick={() => navigate(`/category/${cat.slug}`)}>SHOP NOW</button>
                <button onClick={() => navigate(`/category/${cat.slug}`)}>SEE ALL</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {localCategories.map((cat, index) => (
            <div key={`thumb-${cat._id}`} className="item" onClick={() => handleThumbnailClick(index)}>
                <img src={cat.imageUrl} alt={cat.name} />
                <div className="content">
                    <div className="title">{cat.name}</div>
                    <div className="description">Explore</div>
                </div>
            </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={handlePrev}><ChevronLeft size={24} /></button>
        <button id="next" onClick={handleNext}><ChevronRight size={24} /></button>
      </div>

      <div className="time"></div>
    </div>
  );
};

export default FeaturedCategories;
