export function getImageUrl(path: string | null): string | null {
  if (!path) return null

  const normalizedPath = path.toLowerCase()

  if (normalizedPath.includes('..') || normalizedPath.includes('//')) {
    console.error('❌ Path inválido detectado:', path)
    return null
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  if (!allowedExtensions.some(ext => normalizedPath.endsWith(ext))) {
    console.error('❌ Extensión no permitida:', path)
    return null
  }

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${normalizedPath}`
}