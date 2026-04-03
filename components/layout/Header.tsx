"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Phone, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname, useRouter } from "next/navigation";
import { useCategorias } from "@/hooks/useCategorias";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
];

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const categorias = useCategorias();
  const hideCartRoutes = ["/carrito/confirmacion"];
  const shouldHideCart = hideCartRoutes.includes(pathname);
  const WSP_MSJ = encodeURIComponent(
    "Hola! Vengo de su sitio web y me gustaría hacer una consulta.",
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !mobileMenuOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategoriasOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const cartCount = useCartStore((state) => state.getTotalItems());

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-md py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-rose-500 text-white rounded-lg p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Flores de <span className="text-rose-500">Rayén</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-rose-500 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriasOpen(!categoriasOpen)}
                className="flex items-center text-gray-700 hover:text-rose-500 font-medium transition-colors"
              >
                Categorías
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${categoriasOpen ? "rotate-180" : ""}`}
                />
              </button>

              {categoriasOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {categorias.map((categoria) => (
                    <Link
                      key={categoria}
                      href={`/productos?categoria=${encodeURIComponent(categoria)}`}
                      onClick={() => setCategoriasOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      {categoria}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-4 ml-8">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${WSP_MSJ}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Phone className="w-4 h-4 mr-1" />
                <span className="text-sm hidden lg:block">+56 9 3454 2333</span>
              </a>
            </div>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {!shouldHideCart && (
              <Link
                href="/carrito"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Menú"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 h-screen w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Flores de <span className="text-rose-500">Rayén</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-700 hover:text-rose-500 font-medium border-b border-gray-100"
              >
                {item.name}
              </Link>
            ))}

            <div className="border-b border-gray-100">
              <button
                onClick={() => setCategoriasOpen(!categoriasOpen)}
                className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-rose-500 font-medium"
              >
                Categorías
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${categoriasOpen ? "rotate-180" : ""}`}
                />
              </button>

              {categoriasOpen && (
                <div className="pl-4 space-y-2 pb-2">
                  {categorias.map((categoria) => (
                    <button
                      key={categoria}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setCategoriasOpen(false);
                        router.push(
                          `/productos?categoria=${encodeURIComponent(categoria)}`,
                        );
                      }}
                      className="block w-full text-left py-2 text-gray-600 hover:text-rose-500 transition-colors"
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center justify-center w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
