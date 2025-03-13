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
import LoginForm from "@/components/forms/login";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [customAlert, setCustomAlert] = useState<IAlertaPopupProps>({
    message: "",
    type: "info",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MateLoader />;
  }

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 font-serif">
      {showAlert && (
        <AlertaPopup
          message={customAlert.message}
          type={customAlert.type}
          onClose={() => setShowAlert(false)}
        />
      )}
      <nav className="bg-white shadow-md p-4 flex items-center justify-center">
        <Link
          href="/"
          className="text-green-600 font-bold text-2xl absolute left-4"
        >
          ←
        </Link>
        <LogoTitle title="Mate Do Login" />
      </nav>
      <LoginForm setCustomAlert={setCustomAlert} setShowAlert={setShowAlert} />
      <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do. Todos los derechos
        reservados.
      </footer>
    </section>
  );
}
