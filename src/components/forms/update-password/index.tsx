import { supabase } from "@/context/supabase";
import { IAlertType } from "@/interface/Alert-Interface";
import { useState } from "react";
import { IAuthForm } from "@/interface/AuthForms-interface";
import { useRouter } from "next/navigation";

export default function PasswordUpdateForm ({setCustomAlert,setIsAlertOpen} : IAuthForm) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    
    const router = useRouter();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
          setCustomAlert({
            message: "Las contraseñas no coinciden",
            type: "error" as IAlertType,
          });
          setIsAlertOpen(true);
          return;
        }
    
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
    
        if (error) {
          setCustomAlert({
            message:
              error.message ===
              "New password should be different from the old password."
                ? "Debes poner una contraseña diferente a la anterior"
                : "Error al actualizar la contraseña",
            type: "error" as IAlertType,
          });
          setIsAlertOpen(true);
          return;
        }
    
        setCustomAlert({
          message: "Contraseña actualizada correctamente",
          type: "success" as IAlertType,
        });
        setIsAlertOpen(true);
    
        const timeout = setTimeout(() => router.push("/login"), 3000);
    
        return () => clearTimeout(timeout); 
      };
    return(
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
    )
}