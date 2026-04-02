'use client'

import ProductCard from './ProductCard'
import { Producto } from '@/types/database.types'
import { useCartStore } from '@/store/cartStore'
import { useToast } from './ToastProvider'

interface ProductGridProps {
  productos: Producto[]
}

export default function ProductGrid({ productos }: ProductGridProps) {

  const addToCart = useCartStore((state)=>state.addToCart);
  const { showToast } = useToast();

  const handleAddToCart = (producto:Producto) => {
    addToCart(producto)
    showToast(`Puedes ver tu carrito y continuar la compra`, 'success', `${producto.titulo} agregado al carrito`)
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductCard 
          key={producto.id} 
          producto={producto} 
          onAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  )
}