import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Producto } from '@/types/database.types'

export type CartItem = Producto & {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (producto: Producto, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getWhatsAppMessage: (phoneNumber: string) => string
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (producto, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === producto.id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === producto.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            return {
              items: [...state.items, { ...producto, quantity }]
            }
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.precio * item.quantity), 0)
      },

      getWhatsAppMessage: (phoneNumber: string) => {
        const items = get().items
        const total = get().getTotalPrice()
        
        let message = "Hola! Quiero hacer el siguiente pedido:\n\n"
        
        items.forEach(item => {
          message += `• ${item.titulo} - $${item.precio} x ${item.quantity} = $${item.precio * item.quantity}\n`
        })
        
        message += `\nTotal: $${total}\n\n`
        message += "Gracias!"

        return encodeURIComponent(message)
      }
    }),
    {
      name: 'cart-storage', // nombre para el localStorage
      // Opcional: puedes elegir qué propiedades persistir
      // partialize: (state) => ({ items: state.items }),
    }
  )
)