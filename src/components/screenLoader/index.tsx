"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface MateLoaderProps {
  fullscreen?: boolean
}

export default function  MateLoader({ fullscreen = true }: MateLoaderProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    return () => setShow(false)
  }, [])

  return (
    <div
      className={`flex items-center justify-center bg-[#1B4332] transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      } ${fullscreen ? "fixed inset-0 z-50" : "absolute inset-0 z-40"}`}
    >
      <div className="text-center">
        <h1 className="text-white text-6xl md:text-4xl font-serif flex items-center gap-2">
          Mate Do
          <Image className="animate-bounce" src={"/logos/mate.png"} alt="mate" width={70} height={70} quality={100} />
        </h1>
      </div>
    </div>
  )
}

