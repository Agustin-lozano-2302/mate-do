"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {

  const [isAppLoading, setIsAppLoading] = useState<boolean>(true)

  const router = useRouter()


  const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);


  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false)
    },5000 )
  },[])


  return (isAppLoading ? <section className="w-full min-h-[100vh] bg-green_00 overflow-hidden flex justify-center items-center">
    <div className="flex items-center justify-center h-fit">
      <p className="playfair-d-400 text-5xl">Mate Do</p>
              <Image src={"/logos/mate.png"} alt="mate" width={60} height={60} quality={100} />

    </div>
  </section> :
    <section className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex justify-center">
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
        <div className="space-y-4 w-full max-w-xs flex flex-col gap-2">
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
