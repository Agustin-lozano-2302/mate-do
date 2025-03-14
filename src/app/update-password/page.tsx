"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/context/supabase";
import { useRouter } from "next/navigation";
import AlertaPopup from "@/components/alert";
import LogoTitle from "@/components/logoTitle";
import { IAlertaPopupProps, IAlertType } from "@/interface/Alert-Interface";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<IAlertaPopupProps>({
    message: "",
    type: "info" as IAlertType,
  });

  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // Previene problemas si el componente se desmonta

    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user || error) {
        if (isMounted) router.push("/login");
      }
    };

    checkUser();

    return () => {
      isMounted = false; // Limpieza del efecto
    };
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlertMessage({
        message: "Las contraseñas no coinciden",
        type: "error" as IAlertType,
      });
      setShowAlert(true);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setAlertMessage({
        message:
          error.message ===
          "New password should be different from the old password."
            ? "Debes poner una contraseña diferente a la anterior"
            : "Error al actualizar la contraseña",
        type: "error" as IAlertType,
      });
      setShowAlert(true);
      return; // Agregado para evitar ejecutar el código de éxito si hay error
    }

    setAlertMessage({
      message: "Contraseña actualizada correctamente",
      type: "success" as IAlertType,
    });
    setShowAlert(true);

    const timeout = setTimeout(() => router.push("/login"), 3000);

    return () => clearTimeout(timeout); // Limpieza del timeout si el usuario navega antes
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 font-serif">
      {showAlert && <AlertaPopup {...alertMessage} onClose={() => setShowAlert(false)} />}
      
      <nav className="bg-white shadow-md p-4">
        <LogoTitle title="Actualizar Contraseña" />
      </nav>

      <div className="flex-grow flex justify-center items-center p-6">
        <form
          onSubmit={handleUpdatePassword}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Nueva Contraseña
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Nueva Contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-4 py-2"
                placeholder="********"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-4 py-2"
                placeholder="********"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </section>
  );
}
