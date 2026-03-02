export function getImageUrl(path: string | null): string | null {
  if (!path) return null
  
  // Usar transformaciones de Supabase para optimizar imágenes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const bucketName = process.env.NEXT_PUBLIC_IMAGE_BUCKET || 'productos-imagenes'
  
  // URL directa con transformaciones (ancho máximo 800px para web)
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}?width=800&quality=80`
}

// Formatear precio en formato CLP
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Validar que un producto esté activo y tenga datos mínimos
export function isValidProduct(producto: any): boolean {
  return (
    producto &&
    producto.activo === true &&
    producto.titulo?.trim() &&
    typeof producto.precio === 'number' &&
    producto.precio > 0
  )
}