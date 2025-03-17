import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/context/supabase";
import { useRouter } from "next/navigation";
import { IAuthForm } from "@/interface/AuthForms-interface";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function LoginForm({
  setCustomAlert,
  setIsAlertOpen,
}: IAuthForm) {
  const router = useRouter();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const showMessage = (error: string) => {
    if (error === "Email not confirmed") {
      setCustomAlert({
        message: t('auth.errors.emailNotConfirmed'),
        type: "warning",
      });
    } else {
      setCustomAlert({
        message: t('auth.errors.invalidCredentials'),
        type: "error",
      });
    }
    setIsAlertOpen(true);
  };

  const login = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log("🚀  ~ login error:", error);
      showMessage(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/home");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      console.log("🚀 ~ Google login error:", error);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center p-6">
      <form
        action={login}
        className="bg-gray-100   rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {t('auth.loginTitle')}
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            {t('auth.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) =>
              setFormData({
                email: e.target.value,
                password: formData.password,
              })
            }
            required
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder={t('auth.placeholders.email')}
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
            onChange={(e) =>
              setFormData({ email: formData.email, password: e.target.value })
            }
            required
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder={t('auth.placeholders.password')}
          />
        </div>
         <button
          onClick={login}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          {t('auth.submitLogin')}
        </button>
        <div className="relative my-4">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  px-4 text-gray-500 text-sm">
            {t('auth.or')}
          </span>
        </div>
 
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-50 transition"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          {t('auth.google.continue')}
        </button>
        <div className="text-center flex flex-col gap-2">
          <Link href="/register" className="text-sm ">  <span className="text-black">{t('auth.noAccount')}</span>
          <span className="text-blue-500 hover:underline">  {t('auth.signUp')}</span></Link>
          <Link href="/reset-password" className="text-sm ">
          <span className="text-blue-500 hover:underline">{t('auth.forgotPassword')}</span></Link>
        </div>
      </form>
    </div>
  );
}
