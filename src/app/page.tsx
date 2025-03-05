"use client";
import MateLoader from "@/components/screenLoader";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {


  const [loading, setLoading] = useState(true)


  const router = useRouter()


  const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);



  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setLoading(false)
      // Aquí puedes redirigir a la ruta principal de tu app
      // router.push('/dashboard')
    }, 3000) // 2 segundos de splash screen
  
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) {
    return <MateLoader />
  }


  return (
    <section className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex justify-center items-center">
      <Image src={"/logos/mate.png"} alt="mate" width={40} height={40} quality={100} />
        <h1 className="text-2xl font-bold text-green-600">Mate Do Auth</h1>
      </nav>

      {/* Contenido Principal */}
      <div className=" flex-grow flex flex-col justify-center items-center text-center px-6 space-y-6">
        <h2 className="playfairDisplay text-3xl font-bold text-gray-800">
          La mejor app para crear tus notas
        </h2>
        <p className="playfairDisplay text-gray-600">
          Organiza tu día, guarda tus ideas y mantente productivo con nuestra plataforma.
        </p>
        <div className="space-y-4 w-full max-w-xs">
          <Link href="/login">
            <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/register">
            <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 transition">
              Registrarse
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do Auth. Todos los derechos reservados.
      </footer>
    </section>
  );
}
