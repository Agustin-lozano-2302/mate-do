"use client";
import BurgerMenu from "@/components/burgerMenu";
import LogoTitle from "@/components/logoTitle";
import MateLoader from "@/components/screenLoader";
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
    return <MateLoader /> 
  }

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 ">
      <nav className="bg-white shadow-md p-4 flex gap-2 relative items-center">
      <LogoTitle title="Mis tareas" />
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
              <BurgerMenu logout={logout} localUser={localUser} />
            )}
          </div>
        </div>
      </nav>
       {localUser.id && <Todos user={localUser} />}
    </section>
  );
}
