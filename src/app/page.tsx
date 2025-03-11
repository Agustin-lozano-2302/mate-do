"use client";
import LogoTitle from "@/components/logoTitle";
import MateLoader from "@/components/screenLoader";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {


  const [loading, setLoading] = useState(true)


  const router = useRouter()


  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);



  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setLoading(false)
      // Aquí puedes redirigir a la ruta principal de tu app
      // router.push('/dashboard')
    }, 1000) // 2 segundos de splash screen
  
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Solo ejecutar código relacionado con Supabase en el cliente
      const initSupabase = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        // ... resto de tu lógica
      };
      
      initSupabase();
    }
  }, []);
  
  if (loading) {
    return <MateLoader />
  }


  return (
    <section className="flex flex-col min-h-screen bg-gray-100 font-serif">
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex justify-center items-center">
      <LogoTitle title="Mate Do" />
      </nav>

      {/* Contenido Principal */}
      <div className=" flex-grow flex flex-col justify-center items-center text-center px-6 space-y-6">
        <h2 className="playfairDisplay text-3xl font-bold text-gray-800">
          La mejor app para crear tus notas
        </h2>
        <p className="playfairDisplay text-gray-600">
          Organiza tu día, guarda tus ideas y mantente productivo con nuestra plataforma.
        </p>
        <div className=" w-full max-w-xs flex flex-col gap-2">
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
