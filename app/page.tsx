import Hero from '@/components/sections/Hero'
import { createClient } from '@/lib/supabase/server'
import ProductGrid from '@/components/ui/ProductGrid'
import type { Producto } from '@/types/database.types'

async function getFeaturedProducts(): Promise<Producto[]> {
  const supabase = await createClient()  
  
  const {  data, error } = await supabase
    .from('productos')
    .select(`
      id,
      titulo,
      descripcion,
      categoria,
      precio,
      imagen_path,
      activo,
      created_at,
      updated_at
    `)
    .eq('activo', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error al obtener productos destacados:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const productosDestacados = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos <span className="text-rose-500">Destacados</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros arreglos florales más populares y frescos
            </p>
          </div>

          <ProductGrid productos={productosDestacados} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Sorprender a Alguien Especial?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Elige el arreglo perfecto y hazlo llegar con nuestro servicio de entrega rápida
          </p>
          <a
            href="/productos"
            className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Ver Todos los Productos
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}