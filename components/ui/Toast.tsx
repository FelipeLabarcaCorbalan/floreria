'use client'

import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastData {
  id: string
  message: string
  title?: string
  type: ToastType
}

interface ToastProps {
  toast: ToastData
  onClose: (id: string) => void
}

const iconMap = {
  success: CheckCircle,
  error: X,
  info: CheckCircle,
}

const styleMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const iconStyleMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
}

export default function Toast({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const Icon = iconMap[toast.type]

  const handleClose = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(toast.id)
    }, 300)
  }, [onClose, toast.id])

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))

    const timer = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [handleClose])

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        w-80 p-4 rounded-xl shadow-lg border
        transform transition-all duration-300 ease-out
        ${styleMap[toast.type]}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${iconStyleMap[toast.type]}`} />
        
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="font-semibold text-sm mb-0.5">{toast.title}</p>
          )}
          <p className="text-sm opacity-90">{toast.message}</p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4 opacity-60" />
        </button>
      </div>

      <div className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${toast.type === 'success' ? 'bg-green-400' : toast.type === 'error' ? 'bg-red-400' : 'bg-blue-400'} rounded-full`}
          style={{
            animation: 'toast-progress 3s linear forwards',
          }}
        />
      </div>
    </div>
  )
}
