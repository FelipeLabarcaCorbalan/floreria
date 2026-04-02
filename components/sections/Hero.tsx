'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Producto } from '@/types/database.types'
import { getImageUrl } from '@/app/api/imagenes/route'

interface ProductGridProps {
  heroProducts: Producto[]
}

export default function Hero({ heroProducts }: ProductGridProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
  {
    id: 1,
    title: 'Recuerda y Honra a tus Seres Queridos',
    subtitle: 'Arreglos delicados que expresan lo que las palabras no pueden',
    cta: 'Ver Productos',
    ctaLink: `/productos?categoria=${heroProducts[0]?.categoria}`,
    image: getImageUrl(heroProducts[0]?.imagen_path),
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Flores que Hablan por Ti',
    subtitle: 'Expresa amor, gratitud o amistad con un hermoso ramo',
    cta: 'Ver Productos',
    ctaLink: `/productos?categoria=${heroProducts[1]?.categoria}`,
    image: getImageUrl(heroProducts[1]?.imagen_path),
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 3,
    title: 'Dale Vida a tus Espacios',
    subtitle: 'Piezas únicas que transforman cualquier ambiente',
    cta: 'Ver Productos',
    ctaLink: `/productos?categoria=${heroProducts[2]?.categoria}`,
    image: getImageUrl(heroProducts[2]?.imagen_path),
    gradient: 'from-amber-500 to-orange-500',
  },
]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
 
  return (
    <section className="relative h-[80vh] min-h-[600px]">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: slide.image ? `url(${slide.image})` : 'none',
                backgroundColor: '#f3f4f6',
              }}
            >
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
              
              {/* Pattern overlay for texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMzBsMzAgMzAgMzAtMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-20" />
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in animation-delay-200">
                    {slide.subtitle}
                  </p>
                  <div className="animate-fade-in animation-delay-300">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                    >
                      {slide.cta}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Slide siguiente"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-advance slides */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-1000 ease-linear"
        style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
      />
    </section>
  )
}