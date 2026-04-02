'use client'

import { FiMessageCircle } from 'react-icons/fi'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <FiMessageCircle className="w-8 h-8" />
    </a>
  )
}