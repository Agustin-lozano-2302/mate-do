"use client";
import Button from "@/components/button";
import LogoTitle from "@/components/logoTitle";
import MateLoader from "@/components/screenLoader";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Auth() {
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initSupabase = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
      };

      initSupabase();
    }
  }, []);

  if (loading) {
    return <MateLoader />;
  }

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 font-serif">
      <nav className="bg-white shadow-md p-4 flex justify-center items-center">
        <LogoTitle title="Mate Do" />
      </nav>
      <div className=" flex-grow flex flex-col justify-center items-center text-center px-6 space-y-6">
        <h2 className="playfairDisplay text-3xl font-bold text-gray-800">
          La mejor app para crear tus notas
        </h2>
        <p className="playfairDisplay text-gray-600">
          Organiza tu día, guarda tus ideas y mantente productivo con nuestra
          plataforma.
        </p>
        <div className=" w-full max-w-xs flex flex-col gap-2">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" className="w-full">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do. Todos los derechos
        reservados.
      </footer>
    </section>
  );
}
