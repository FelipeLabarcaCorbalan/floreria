export function getImageUrl(path: string | null): string | null {
  if (!path) return null
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const bucketName = process.env.NEXT_PUBLIC_IMAGE_BUCKET
  
  const normalizedPath = path.toLowerCase()
  
  // path traversal
  if (normalizedPath.includes('..') || normalizedPath.includes('//')) {
    console.error('❌ Path inválido detectado:', path)
    return null
  }
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const hasValidExtension = allowedExtensions.some(ext => 
    normalizedPath.endsWith(ext)
  )
  if (!hasValidExtension) {
    console.error('❌ Extensión no permitida:', path)
    return null
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${normalizedPath}`
}

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