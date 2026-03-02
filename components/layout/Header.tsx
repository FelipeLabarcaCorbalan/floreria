// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { Menu, X, ShoppingCart, Phone, MapPin } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos' },
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = cartItems.reduce((sum: any, item: { quantity: any }) => sum + (item.quantity || 1), 0)

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-md py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-rose-500 text-white rounded-lg p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4z" />
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
            
            {/* Contact Info */}
            <div className="flex items-center space-x-4 ml-8">
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Phone className="w-4 h-4 mr-1" />
                <span className="text-sm hidden lg:block">+56 9 1234 5678</span>
              </a>
            </div>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
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
        <div className="md:hidden fixed inset-0 bg-white z-50">
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
  )
}