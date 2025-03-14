"use client";
import { useState } from "react";
import { supabase } from "@/context/supabase";
import AlertaPopup from "@/components/alert";
import LogoTitle from "@/components/logoTitle";
import Link from "next/link";
import { IAlertaPopupProps, IAlertType } from "@/interface/Alert-Interface";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<IAlertaPopupProps>({
    message: "",
    type: "info" as IAlertType
  });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setAlertMessage({
        message: "Revisa tu correo para cambiar la contraseña",
        type: "success" as IAlertType
      });
      setShowAlert(true);
    } catch (error) {
      setAlertMessage({
        message: "Error al enviar el correo de recuperación",
        type: "error" as IAlertType
      });
      setShowAlert(true);
    }
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 font-serif">
      {showAlert && (
        <AlertaPopup
          {...alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <nav className="bg-white shadow-md p-4 flex items-center justify-center">
        <Link href="/login" className="text-green-600 font-bold text-2xl absolute left-4">
          ←
        </Link>
        <LogoTitle customStyles={true} title="Recuperar Contraseña" />
      </nav>
      <div className="flex-grow flex justify-center items-center p-6">
        <form
          onSubmit={handleResetPassword}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center ">
            Recuperar Contraseña
          </h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
          >
            Enviar Correo de Recuperación
          </button>
        </form>
      </div>
    </section>
  );
} 