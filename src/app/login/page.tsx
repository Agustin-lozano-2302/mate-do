"use client";
import { supabase } from "@/context/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@mui/material";
import AlertTitle from '@mui/material/AlertTitle';



export default function Login() {

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const router = useRouter()



  const login = async () => { 

    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
     if(error.message === "Invalid login credentials"){
      setErrorMessage("La contraseña es incorrecta")
     } 
     setIsError(true)
     setTimeout(() => {
       setIsError(false);
     }, 5000); 
    } else {
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
      router.push("/home")
    }
  }
}

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 relative">
            {isError && <Alert className="absolute top-0 right-0 w-fit" severity="error">
  <AlertTitle>Error</AlertTitle>
  {errorMessage}
</Alert>}
      {/* Header */}
      <nav className="bg-white shadow-md p-4 flex items-center">
        <Link href="/" className="text-green-600 font-bold text-2xl">
          ←
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-700">
          Mate Do Login
        </h1>
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
