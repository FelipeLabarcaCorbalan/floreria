export function ProductSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="bg-gray-200 h-5 w-3/4 rounded" />
        <div className="bg-gray-200 h-4 w-full rounded" />
        <div className="bg-gray-200 h-4 w-2/3 rounded" />
        <div className="bg-gray-200 h-8 w-1/3 rounded mt-2" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}