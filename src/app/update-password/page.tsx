"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/context/supabase";
import { useRouter } from "next/navigation";
import AlertaPopup from "@/components/alert";
import LogoTitle from "@/components/logoTitle";
import { IAlertaPopupProps, IAlertType } from "@/interface/Alert-Interface";
import PasswordUpdateForm from "@/components/forms/update-password";

export default function UpdatePassword() {

  const [isOpenAlert, setIsAlertOpen] = useState(false);
  const [customAlert, setCustomAlert] = useState<IAlertaPopupProps>({
    message: "",
    type: "info" as IAlertType,
  });

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user || error) {
        if (isMounted) router.push("/login");
      }
    };

    checkUser();

    return () => {
      isMounted = false; 
    };
  }, [router]);



  return (
    <section className="flex flex-col min-h-screen bg-gray-100 ">
      {isOpenAlert && <AlertaPopup {...customAlert} onClose={() => setIsAlertOpen(false)} />}
      
      <nav className="bg-white shadow-md p-4">
        <LogoTitle title="Actualizar Contraseña" />
      </nav>
      <PasswordUpdateForm setIsAlertOpen={setIsAlertOpen} setCustomAlert={setCustomAlert} />
    </section>
  );
}
