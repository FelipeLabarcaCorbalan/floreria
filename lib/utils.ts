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