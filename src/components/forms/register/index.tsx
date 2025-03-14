"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/context/supabase";
import { IAuthForm } from "@/interface/AuthForms-interface";


export default function RegisterForm ({ setIsAlertOpen} : IAuthForm) {

    const [formData, setFormData] = useState<{
        name: string,
        lastname: string,
        email: string;
        password: string;
        passwordC: string;
      }>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordC: "",
      });

    const handleFormChange =  (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, 
          })
      }
    
      const register = async () => { 
    
        let { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                  first_name: formData.name,
                  last_name: formData.lastname,
                },
              },
          })
    
        if (error) {
          console.log("🚀  ~ login error:", error) 
        } else {
        setIsAlertOpen(true)
        }
      }



    return (
        <div className="flex-grow flex justify-center items-center p-8">
        <form
          action={register}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Registrate
          </h2>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-600"
            >
                Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => handleFormChange(e)}   
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Nombres"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-600"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => handleFormChange(e)}   
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Apellidos"
            />
          </div>
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
              onChange={(e) => handleFormChange(e)}   
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
              onChange={(e) => handleFormChange(e)}   
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="********"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="passwordC"
              className="text-sm font-medium text-gray-600"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              id="passwordC"
              name="passwordC"
              onChange={(e) => handleFormChange(e)}   
              required
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="********"
            />
          </div>
          <button
          type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
           Resgistrate
          </button>
          <div className="text-center flex flex-col gap-2">
            <a
              className="text-sm text-blue-500 hover:underline"
            >
             <span className="text-black"> ¿No tienes una cuenta? </span>Registrate aquí.
            </a>
            <a
              href="/reset-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Olvidé mi contraseña
            </a>
          </div>
        </form>
      </div>
    )
}