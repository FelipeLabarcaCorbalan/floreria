"use client";
import { apiGet } from "@/lib/apiHelper";
import { Producto } from "@/types/database.types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ui/ProductGrid";

interface Props {
  categorias: string[];
}

export function ProductosTabs({ categorias }: Props) {
  const searchParams = useSearchParams();
  const categoriaFromUrl = searchParams.get("categoria");
  const [activa, setActiva] = useState(
    categoriaFromUrl && categorias.includes(categoriaFromUrl) 
      ? categoriaFromUrl 
      : categorias[0]
  );
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam && categorias.includes(categoriaParam)) {
      setActiva(categoriaParam);
    }
  }, [searchParams, categorias]);

  useEffect(() => {
    if (!activa) return;
    setLoading(true);
    apiGet<Producto[]>(`/productos/categoria/${activa}`)
      .then(setProductos)
      .finally(() => setLoading(false));
  }, [activa]);

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setActiva(categoria)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activa === categoria
                  ? "bg-rose-500 text-white border-rose-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-rose-50 hover:border-rose-300"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>
      {loading ? <p>Cargando...</p> : <ProductGrid productos={productos} />}

      {/* Sección de WhatsApp CTA */}
      <div className="mt-16 text-center">
        <div className="bg-rose-50 rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-gray-600 mb-6">
            ¡Contáctanos por WhatsApp! Nuestros expertos floristas te ayudarán a
            crear el arreglo perfecto para tu ocasión especial.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Flores de Rayén, necesito ayuda para elegir un arreglo floral")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18.293 4.293a1 1 0 00-1.414 0L15 6.172V3a1 1 0 00-1-1H6a1 1 0 00-1 1v10a1 1 0 001 1h9a1 1 0 001-1V9.828l1.879 1.879a1 1 0 001.414-1.414L18.293 4.293zM16 3v4a1 1 0 001 1h4V3h-5zm-1 10H5V3h8v10z"
                clipRule="evenodd"
              />
            </svg>
            Hablar con un florista
          </a>
        </div>
      </div>
    </>
  );
}
