"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface RegistroAlertModalProps {
  isOpen: boolean
  onClose: () => void
  redirectLogin: () => void
}

export default function RegistroAlertModal({ isOpen, onClose, redirectLogin }: RegistroAlertModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
    }
  }, [isOpen])

  if (!isOpen && !isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
          <span className="sr-only">Cerrar</span>
        </button>

        <div className="text-center">
          <div className="mb-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold mb-2">¡Tu registro ya casi está listo!</h3>
          <p className="text-gray-600 mb-6">
            Solo tienes que revisar tu correo y verificar tu cuenta para completar el proceso.
          </p>

          <button
            onClick={redirectLogin}
            className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  )
}

