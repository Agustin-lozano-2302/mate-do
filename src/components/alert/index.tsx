"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"
import { IAlertaPopupProps, IAlertType } from "@/interface/Alert-Interface"



const alertStyles = {
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  success: "bg-green-100 border-green-400 text-green-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
}

const AlertIcon = ({ type }: { type: IAlertType }) => {
  switch (type) {
    case "error":
      return <AlertCircle className="w-5 h-5" />
    case "warning":
      return <AlertCircle className="w-5 h-5" />
    case "success":
      return <CheckCircle className="w-5 h-5" />
    case "info":
      return <Info className="w-5 h-5" />
  }
}

export default function AlertaPopup({ message, type, duration = 5000, onClose }: IAlertaPopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose && onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])
  

  if (!isVisible) return null

  return (
    <div
      className={`fixed w-full flex justify-center bottom-4`}
      role="alert"
    >
    <div
      className={`w-4/5 flex items-center p-4 mb-4 text-sm rounded-lg ${alertStyles[type]}`}
      role="alert"
    >
      <AlertIcon type={type} />
      <span className="sr-only">{type}:</span>
      <div className="ml-3 mr-5 font-medium">{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${
          alertStyles[type]
        }`}
        onClick={() => {
          setIsVisible(false)
          onClose && onClose()
        }}
        aria-label="Close"
      >
        <span className="sr-only">Cerrar</span>
        <X className="w-5 h-5" />
      </button>
    </div>
    </div>
  )
}

