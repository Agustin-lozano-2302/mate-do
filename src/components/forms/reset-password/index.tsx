import { supabase } from "@/context/supabase";
import { IAlertType } from "@/interface/Alert-Interface";
import { useState } from "react";
import { IAuthForm } from "@/interface/AuthForms-interface";
import { useTranslation } from "react-i18next";

export default function PasswordResetForm({ setCustomAlert, setIsAlertOpen }: IAuthForm) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
          });
    
          if (error) throw error;
    
          setCustomAlert({
            message: t('auth.resetPassword.subtitle'),
            type: "success" as IAlertType
          });
          setIsAlertOpen(true);
        } catch (error) {
            setCustomAlert({
            message: t('auth.resetPassword.errors.sendError'),
            type: "error" as IAlertType
          });
          setIsAlertOpen(true);
        }
      };
    return(
        <div className="flex-grow flex justify-center items-center p-6">
        <form
          onSubmit={handleResetPassword}
          className="bg-gray-100   rounded-lg p-6 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center ">
            {t('auth.resetPassword.title')}
          </h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder={t('auth.placeholders.email')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
          >
            {t('auth.resetPassword.submitButton')}
          </button>
        </form>
      </div>
    )
}