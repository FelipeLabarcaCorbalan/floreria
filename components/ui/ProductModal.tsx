'use client'

import { useEffect, useCallback } from 'react'
import { Producto } from '@/types/database.types'
import { getImageUrl } from '@/lib/images'

interface ProductModalProps {
  producto: Producto
  onClose: () => void
  onAddToCart?: (producto: Producto) => void
}

export default function ProductModal({ producto, onClose, onAddToCart }: ProductModalProps) {
  const imageUrl = producto.imagen_path ? getImageUrl(producto.imagen_path) : null

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={producto.titulo}
                className="max-h-[50vh] md:max-h-[70vh] w-auto object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 md:h-96 flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4z" />
                </svg>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="mb-4">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                {producto.categoria}
              </span>
            </div>

            <h2 className="font-bold text-2xl md:text-3xl mb-4 text-gray-900">
              {producto.titulo}
            </h2>

            {producto.descripcion && (
              <p className="text-gray-600 mb-6 flex-grow">
                {producto.descripcion}
              </p>
            )}

            {!producto.activo && (
              <div className="bg-red-100 text-red-700 text-sm font-bold px-4 py-2 rounded-lg mb-4 inline-block">
                AGOTADO
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-3xl text-green-700">
                  ${producto.precio.toLocaleString('es-CL')}
                </span>
              </div>

              {producto.activo && onAddToCart && (
                <button
                  onClick={() => {
                    onAddToCart(producto)
                    onClose()
                  }}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar al carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
