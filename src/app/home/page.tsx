"use client";
import { supabase } from "@/context/supabase";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {


  type UserMetadata = {
    email: string;
    email_verified: boolean;
    first_name: string;
    last_name: string;
    phone_verified: boolean;
    sub: string;
  };


  const [user, setUser] = useState<UserMetadata>({
    email: "",
    email_verified: false,
    first_name: "",
    last_name: "",
    phone_verified: false,
    sub: "",
  });

  const router = useRouter()



  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(user) {
      setUser(user.user_metadata as UserMetadata)
    } else {
      localStorage.clear()
      router.push("/login")
    }
  }

  const logout =  () => {
    if(user) {
      localStorage.clear()
      router.push("/login")
    }
  }



  useEffect(() => {
    getUser()
  },[])

  
  return (
    <section className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex gap-2 relative items-center">
        <Image src={"/logos/mate.png"} alt="mate" width={40} height={40} quality={100} />
        <p className="text-black font-bold mt-2">Mate Do</p>
        <div className="absolute right-5 flex items-center gap-2">
        <h1 className="text-base text-center text-black"> {user.first_name}</h1>
        <Image onClick={logout} src={"/icons/logout.png"} alt="logout" width={20} height={20} quality={100} />
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 space-y-6">
       
      </div>

      {/* Footer */}
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do Auth. Todos los derechos reservados.
      </footer>
    </section>
  );
}
