"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

export default function Login() {
  const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "agus.lozano.2302@gmail.com",
      password: "password123",
      options: {
        data: {
          complete_name: "Agustin Lozano B",
          
        },
      },
    });
    if (error) {
      console.log("🚀 ~ signUp ~ error:", error);
      return [];
    }
    console.log("🚀 ~ signUp ~ data:", data)
  };

  const getUser = async () => {
    const {
      data: { user, },
    } = await supabase.auth.getUser()
    const metadata = user?.user_metadata

    console.log("🚀 ~ signUp ~ data:", metadata)
  };

  useEffect(() => {
  }, []);

  return (
    <section className="flex flex-col max-h-[100vh] overflow-hidden">
      <nav className="header border-b-2 border-red-500">
        <p className="text-center">WallDO Login</p>
      </nav>
      <div className="w-full h-52 flex justify-center items-center">
        <button className="border-white border-2 p-4 w-fit" onClick={signUp}>
          Registrarme a mi mismo
        </button>
      </div>
    </section>
  );
}
