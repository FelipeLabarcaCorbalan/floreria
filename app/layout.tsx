// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { CartProvider } from '@/components/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flores de Rayén - Tu florería online',
  description: 'Flores frescas y arreglos florales para cada ocasión. Envíos a todo Chile.',
  keywords: 'flores, arreglos florales, ramos, flores online, Chile',
  authors: [{ name: 'Flores de Rayén' }],
  openGraph: {
    title: 'Flores de Rayén',
    description: 'Flores frescas y arreglos florales para cada ocasión',
    type: 'website',
    locale: 'es_CL',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Flores de Rayén',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* ✅ Proveedor de contexto para el carrito */}
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  )
}