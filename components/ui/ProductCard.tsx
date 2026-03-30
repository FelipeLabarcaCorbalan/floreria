'use client'

import { useState } from 'react'
import { getImageUrl } from '@/app/api/imagenes/route'
import { Producto } from '@/types/database.types'
import ProductModal from './ProductModal'

interface ProductCardProps {
  producto: Producto
  onAddToCart?: (producto: Producto) => void
}
export default function ProductCard({ producto, onAddToCart }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const imageUrl = producto.imagen_path ? getImageUrl(producto.imagen_path) : null 

  return (
    <>
      <div 
        className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
      <div className="relative bg-gray-100 h-48">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={producto.titulo}
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4z" />
            </svg>
          </div>
        )}
        
        {!producto.activo && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            AGOTADO
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            {producto.categoria}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{producto.titulo}</h3>
        
        {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {producto.descripcion || 'Hermoso arreglo floral fresco y elegante.'}
        </p> */}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl text-green-700">
              ${producto.precio.toLocaleString('es-CL')}
            </span>
            
            {producto.activo && onAddToCart && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(producto)
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                aria-label={`Agregar ${producto.titulo} al carrito`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
      </div>

      {isModalOpen && (
        <ProductModal
          producto={producto}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  )
}