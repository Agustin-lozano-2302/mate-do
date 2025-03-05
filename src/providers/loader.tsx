"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MateLoader from "@/components/screenLoader"

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  // Detectar cambios de ruta para mostrar el loader
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Tiempo mínimo de loading

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <MateLoader fullscreen={false} />}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

