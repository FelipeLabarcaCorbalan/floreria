import { apiGet } from "@/lib/apiHelper";
import { ProductosTabs } from "./ProductosTabs";
import { Suspense } from "react";

export default async function ProductosPage() {

  const categorias = await apiGet<string[]>("/productos/categorias")

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
      <Suspense fallback={<div className="text-center py-12">Cargando...</div>}>
        <ProductosTabs categorias={categorias} />
      </Suspense>
      </div>
    </div>
  );
}
