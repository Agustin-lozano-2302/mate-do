"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/context/supabase";
import { IAuthForm } from "@/interface/AuthForms-interface";
import { useTranslation } from "react-i18next";
import Link from "next/link";


export default function RegisterForm ({ setIsAlertOpen} : IAuthForm) {
    const { t } = useTranslation();
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
          className="bg-gray-100   rounded-lg p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {t('auth.registerTitle')}
          </h2>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-600"
            >
                {t('auth.name')}
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
              {t('auth.lastname')}
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
              {t('auth.email')}
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
              {t('auth.password')}
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
              {t('auth.confirmPassword')}
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
           {t('auth.submitRegister')}
          </button>
          <div className="text-center flex flex-col gap-2">
          <Link href="/login" className="text-sm ">  <span className="text-black">{t('auth.hasAccount')}</span>
          <span className="text-blue-500 hover:underline">      {t('auth.signIn')}</span></Link>
            <Link href="/reset-password" className="text-sm ">
            <span className="text-blue-500 hover:underline">{t('auth.forgotPassword')}</span></Link>
          </div>
        </form>
      </div>
    )
}