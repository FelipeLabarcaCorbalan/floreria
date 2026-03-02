// app/productos/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductGrid from '@/components/ui/ProductGrid'
import type { Producto } from '@/types/database.types'

// Función para obtener productos (se ejecuta en el servidor)
async function getProducts(): Promise<Producto[]> {
  const supabase = await createClient()  // ✅ Ahora con await
  
  try {
    // ✅ Solo productos activos (seguridad en base de datos + aplicación)
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
      .eq('activo', true) // 🔒 Filtrado de seguridad
      .order('created_at', { ascending: false })
      .limit(50) // Límite razonable para evitar sobrecarga

    if (error) {
      console.error('Error al obtener productos:', error)
      throw error
    }

    // ✅ Validación adicional en aplicación
    const validProducts = data?.filter(producto => 
      producto.titulo?.trim() && 
      typeof producto.precio === 'number' && 
      producto.precio > 0
    ) || []

    return validProducts
  } catch (error) {
    console.error('Error en getProducts:', error)
    return []
  }
}

export default async function ProductosPage() {
  // ✅ Carga de datos en servidor (SSR)
  const productos = await getProducts()

  // Redirección si no hay productos (mejor UX)
  if (productos.length === 0) {
    redirect('/productos/sin-stock')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros <span className="text-rose-500">Arreglos Florales</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección de flores frescas y arreglos florales 
            creados con amor para cada ocasión especial.
          </p>
        </div>

        {/* Filtros (opcional - se puede agregar después) */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {['Todos', 'Flores', 'Arreglos', 'Plantas', 'Ofertas'].map((categoria) => (
              <button
                key={categoria}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 hover:bg-rose-50 hover:border-rose-300 transition-colors"
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        <ProductGrid productos={productos} />

        {/* Sección de WhatsApp CTA */}
        <div className="mt-16 text-center">
          <div className="bg-rose-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas ayuda para elegir?
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Contáctanos por WhatsApp! Nuestros expertos floristas te ayudarán 
              a crear el arreglo perfecto para tu ocasión especial.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Flores de Rayén, necesito ayuda para elegir un arreglo floral')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18.293 4.293a1 1 0 00-1.414 0L15 6.172V3a1 1 0 00-1-1H6a1 1 0 00-1 1v10a1 1 0 001 1h9a1 1 0 001-1V9.828l1.879 1.879a1 1 0 001.414-1.414L18.293 4.293zM16 3v4a1 1 0 001 1h4V3h-5zm-1 10H5V3h8v10z" clipRule="evenodd" />
              </svg>
              Hablar con un florista
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}