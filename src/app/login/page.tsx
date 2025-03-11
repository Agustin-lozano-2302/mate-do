"use client";
import { supabase } from "@/context/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MateLoader from "@/components/screenLoader";
import Image from "next/image";
import AlertaPopup from "@/components/alert";
import { IAlertaPopupProps } from "@/interface/Alert-Interface";
import LogoTitle from "@/components/logoTitle";

export default function Login() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false)

  const [customAlert, setCustomAlert] = useState<IAlertaPopupProps>({
    message: "",
    type: "info"
  });

  const router = useRouter()

  const showMessage = (error: string) => {
    if(error === "Email not confirmed") {
    setCustomAlert({
      message: "Necesitas verificar tu mail",
      type: "warning"
    })
  } else {
    setCustomAlert({
      message: "Correo o contraseña incorrecta",
      type: "error"
    })
  }
    setShowAlert(true)
  }


  const login = async () => { 
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      console.log("🚀  ~ login error:", error)
      showMessage(error.message)
    } else {
    console.log("🚀  ~ login success:", data)
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
      router.push("/home")
    }
  }
}

const handleGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/home`
    }
  });

  if (error) {
    console.log("🚀 ~ Google login error:", error);
  }
};

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
      {showAlert && (
        <AlertaPopup
          message={customAlert.message}
          type={customAlert.type}
          onClose={() => setShowAlert(false)}
        />
      )}
      <nav className="bg-white shadow-md p-4 flex items-center justify-center">
        <Link href="/" className="text-green-600 font-bold text-2xl absolute left-4">
          ←
        </Link>
       <LogoTitle title="Mate Do Login" />
      </nav>

      {/* Formulario */}
      <div className="flex-grow flex justify-center items-center px-6">
        <form
          action={login}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Iniciar Sesión
          </h2>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setFormData({email: e.target.value, password: formData.password})}
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setFormData({email: formData.email, password: e.target.value})}
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="********"
            />
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-50 transition"
          >
            <Image 
              src="/icons/google.svg" 
              alt="Google" 
              width={20} 
              height={20} 
            />
            Continuar con Google
          </button>
          <div className="relative my-4">
            <hr className="border-gray-300" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500 text-sm">
              o
            </span>
          </div>
          <button
            onClick={login}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Iniciar Sesión
          </button>
          <div className="text-center flex flex-col gap-2">
            <a
              href="/register"
              className="text-sm text-blue-500 hover:underline"
            >
             <span className="text-black"> ¿No tienes una cuenta? </span>Registrate aquí.
            </a>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline"
            >
              Olvidé mi contraseña
            </a>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do Login. Todos los derechos
        reservados.
      </footer>
    </section>
  );
  }
