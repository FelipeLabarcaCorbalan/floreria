"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore, CartItem } from "@/store/cartStore";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { apiPost } from "@/lib/apiHelper";
import { CrearPedidoDto, PedidoResponse } from "@/types/pedidos";
import { getImageUrl } from "@/lib/images";

const WHATSAPP_PHONE = "+56987783562";

export default function CartView() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCartStore();
  const [phoneDigits, setPhoneDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //whatsapp flujo
  const { getWhatsAppMessage } = useCartStore();

  const total = getTotalPrice();
  const isValidPhone = phoneDigits.length === 8 && /^\d{8}$/.test(phoneDigits);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    setPhoneDigits(value);
    setError("");
  };
  const crearPedido = async () => {
    if (!isValidPhone) {
      setError("Ingresa los 8 dígitos de tu número móvil");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload: CrearPedidoDto = {
        telefono: `+569${phoneDigits}`,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      };

      const data = await apiPost<PedidoResponse>(
        "/pedidos/crear-pedido",
        payload,
      );

      router.push(`/carrito/confirmacion?orden=${data.numero}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el pedido",
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async () => {
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${getWhatsAppMessage(WHATSAPP_PHONE)}`;
    window.open(whatsappUrl, "_blank");
    crearPedido();
  };
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          ¡Aún no has agregado productos. Explora nuestro catálogo y encuentra
          el regalo perfecto!
        </p>
        <Link
          href="/productos"
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tu Carrito</h1>
        <button
          onClick={() => {
            if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
              clearCart();
            }
          }}
          className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Vaciar carrito
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">Total</span>
          <span className="text-3xl font-bold text-primary">
            ${total.toLocaleString("es-CL")}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Ingresa tu número de celular
          </label>
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium">
              +569
            </span>
            <input
              type="tel"
              value={phoneDigits}
              onChange={handlePhoneChange}
              placeholder="12345678"
              maxLength={8}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg tracking-widest text-center"
            />
          </div>
          <p className="text-gray-500 text-sm mt-2">Ej: 91234567</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!isValidPhone || isLoading}
          className={`w-full font-bold py-4 px-6 rounded-lg transition-colors text-lg ${
            isValidPhone && !isLoading
              ? "bg-primary hover:bg-primary/90 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Procesando..." : "Confirmar Pedido"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Al confirmar, se creará un número de pedido y podrás finalizarlo por
          WhatsApp.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/productos"
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const imageUrl = item.imagen_path ? getImageUrl(item.imagen_path) : null;
  const subtotal = item.precio * item.quantity;

  return (
    <div className="p-4 sm:p-6 flex gap-4 sm:gap-6">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-gray-800 truncate">{item.titulo}</h3>
        <p className="text-gray-500 text-sm mb-2">{item.categoria}</p>
        <p className="text-primary font-semibold">
          ${item.precio.toLocaleString("es-CL")} c/u
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Eliminar producto"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Disminuir cantidad"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>

          <span className="w-8 text-center font-semibold">{item.quantity}</span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <p className="font-bold text-primary">
          ${subtotal.toLocaleString("es-CL")}
        </p>
      </div>
    </div>
  );
}
