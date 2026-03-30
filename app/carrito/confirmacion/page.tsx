"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const ordenId = searchParams.get("orden");
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, []);

  if (!ordenId) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Orden no encontrada
        </h2>
        <Link
          href="/carrito"
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="bg-green-100 rounded-full p-4 inline-flex mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Pedido Recibido!
        </h1>

        <p className="text-gray-600 mb-6">
          Tu pedido ha sido registrado exitosamente.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-500 text-sm mb-1">Número de Orden</p>
          <p className="text-4xl font-bold text-primary">#{ordenId}</p>
        </div>

        <p className="text-gray-600 mb-8">
          Finaliza tu pedido por whatsapp para confirmar los detalles y
          coordinar la entrega.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex-1 text-primary hover:text-primary/80 font-medium py-3 px-6 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500">Cargando...</p>
          </div>
        }
      >
        <ConfirmacionContent />
      </Suspense>
    </main>
  );
}
