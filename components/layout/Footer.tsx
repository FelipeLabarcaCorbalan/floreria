import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react'

const footerSections = [
  {
    title: 'Flores de Rayén',
    links: [
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Nuestros Productos', href: '/productos' },
      { name: 'Políticas de Envío', href: '/envios' },
      { name: 'Términos y Condiciones', href: '/terminos' },
    ],
  },
  {
    title: 'Categorías',
    links: [
      { name: 'Flores Frescas', href: '/productos?categoria=flores' },
      { name: 'Arreglos Florales', href: '/productos?categoria=arreglos' },
      { name: 'Plantas', href: '/productos?categoria=plantas' },
      { name: 'Ofertas Especiales', href: '/ofertas' },
    ],
  },
  {
    title: 'Atención al Cliente',
    links: [
      { name: 'Contáctanos', href: '/contacto' },
      { name: 'Preguntas Frecuentes', href: '/faq' },
      { name: 'Devoluciones', href: '/devoluciones' },
      { name: 'Política de Privacidad', href: '/privacidad' },
    ],
  },
]

const contactInfo = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: `${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'michelle.sepulveda4@gmail.com',
    href: 'mailto:michelle.sepulveda4@gmail.com',
  },
  //   {
  //   icon: Facebook,
  //   label: 'Facebook',
  //   value: 'Lun - Vie: 9:00 - 19:00',
  //   href: '#',
  // },
  //   {
  //   icon: Instagram,
  //   label: 'Instagram',
  //   value: 'Lun - Vie: 9:00 - 19:00',
  //   href: '#',
  // },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        </div>
      </div> */}

      {/* Contact Info Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">
                    <Icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-rose-500 transition-colors font-medium text-sm block"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}