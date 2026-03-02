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
    value: '+56 9 1234 5678',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hola@floresderayen.cl',
    href: 'mailto:hola@floresderayen.cl',
  },
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Santiago, Chile',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun - Vie: 9:00 - 19:00',
    href: '#',
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-rose-500 text-white rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Flores de <span className="text-rose-500">Rayén</span></span>
            </div>
            
            <p className="text-gray-400 text-sm">
              Tu florería online de confianza. Flores frescas y arreglos florales 
              creados con amor para cada ocasión especial.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://facebook.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-bold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

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

      {/* Copyright */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Flores de Rayén. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}