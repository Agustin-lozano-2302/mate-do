"use client";
import Todos from "@/components/todos";
import { supabase } from "@/context/supabase";
import Image from "next/image";
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
    id: string;
  };

  const [localUser, setLocalUser] = useState<UserMetadata>({
    email: "",
    email_verified: false,
    first_name: "",
    last_name: "",
    phone_verified: false,
    sub: "",
    id: ""
  });

  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if(user) {
        setLocalUser({...user.user_metadata as UserMetadata, id: user.id})
      } else {0
        if (typeof window !== 'undefined') {
          window.localStorage.clear()
        }
         router.push("/login")
      }
    } finally{
      setIsLoading(false)
    }
  }
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
      }

      router.push("/login")
    }
  }


  useEffect(()=> {
    getUser()
  },[])

  if (isLoading) {
    return <div>Cargando...</div> // O tu componente de loading
  }

  return (
    <section className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex gap-2 relative items-center">
        <Image src={"/logos/mate.png"} alt="mate" width={40} height={40} quality={100} />
        <p className="text-black font-bold mt-2">Mate Do</p>
        <div className="absolute right-5 flex items-center gap-2">
          <div className="relative">
            <Image 
              src={"/logos/user.png"} 
              alt="mate" 
              width={40} 
              height={40} 
              quality={100}
              className="cursor-pointer" 
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm text-gray-700 font-semibold">
                  {localUser.first_name}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 font-semibold justify-between"
                >
                  Cerrar sesión
                  <Image src={"/icons/logout.png"} alt="logout" width={20} height={20} quality={100} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
       {localUser.id && <Todos user={localUser} />}

      {/* Footer */}
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do Auth. Todos los derechos reservados.
      </footer>
    </section>
  );
}
