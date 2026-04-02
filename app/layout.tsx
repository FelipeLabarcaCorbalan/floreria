// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ToastProvider from '@/components/ui/ToastProvider'

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
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </ToastProvider>
      </body>
    </html>
  )
}