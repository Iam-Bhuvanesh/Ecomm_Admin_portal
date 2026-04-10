import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "NEW", href: "#" },
  { name: "SHOP", href: "#" },
  { name: "TRACK ORDER", href: "#" },
  { name: "STORE LOCATOR", href: "#" },
  { name: "ABOUT US", href: "/#about" }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-[1000]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Gridox<span className="text-accent">!</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wider text-foreground hover:text-accent transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <button aria-label="Account" className="hidden md:block text-foreground hover:text-accent transition-colors">
            <User size={20} />
          </button>
          <button aria-label="Cart" className="text-foreground hover:text-accent transition-colors relative">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 text-sm font-medium tracking-wider text-foreground hover:text-accent border-b border-border last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
