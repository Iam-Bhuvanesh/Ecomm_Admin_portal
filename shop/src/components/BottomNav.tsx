import { Home, Menu, Search, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const items = [
  { icon: Home,         label: "HOME",    path: "/" },
  { icon: Menu,         label: "MENU",    path: null },
  { icon: Search,       label: "SEARCH",  path: null },
  { icon: LayoutGrid,   label: "SHOP",    path: null },
  { icon: ShoppingCart, label: "CART",    path: "/cart" },
  { icon: User,         label: "ACCOUNT", path: "/account" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="md:hidden fixed bottom-1 left-4 right-4 bg-white/95 backdrop-blur-sm border border-border shadow-lg z-50 rounded-2xl px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-2.5">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => path && navigate(path)}
            className="flex flex-col items-center gap-1 text-[#1a1a1a] hover:text-[#881337] transition-all bg-transparent border-none cursor-pointer group"
          >
            <Icon size={20} strokeWidth={2} className="group-active:scale-90 transition-transform" />
            <span className="text-[9px] font-bold tracking-wider">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
