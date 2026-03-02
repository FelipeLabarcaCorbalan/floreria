// components/ui/ProductGrid.tsx
'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { Producto } from '@/types/database.types'

interface ProductGridProps {
  productos: Producto[]
}

export default function ProductGrid({ productos }: any) {
  const [cart, setCart] = useState<Producto[]>([])

  const addToCart = (producto: Producto) => {
    // Lógica simple de carrito (se puede mejorar con contexto o Zustand)
    setCart(prev => {
      const exists = prev.find(p => p.id === producto.id)
      if (exists) {
        console.log('issue')
        // return prev.map(p => 
        //   p.id === producto.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        // )
      }
      return [...prev, { ...producto, quantity: 1 }]
    })

    // Feedback visual
    alert(`✅ ${producto.titulo} agregado al carrito!\n\nPronto podrás ver tu carrito completo y continuar la compra por WhatsApp.`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto:any) => (
        <ProductCard 
          key={producto.id} 
          producto={producto} 
          onAddToCart={addToCart} 
        />
      ))}
    </div>
  )
}