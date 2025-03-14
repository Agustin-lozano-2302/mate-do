"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegistroAlertModal from "@/components/registerAlert/registerAlert";
import Footer from "@/components/footer";
import BackArrow from "@/components/backArrow";
import LogoTitle from "@/components/logoTitle";
import RegisterForm from "@/components/forms/register";
import AlertaPopup from "@/components/alert";
import { IAlertaPopupProps } from "@/interface/Alert-Interface";

export default function Register() {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [customAlert, setCustomAlert] = useState<IAlertaPopupProps>({
    message: "",
    type: "info",
  });
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <RegistroAlertModal
        onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
        redirectLogin={redirectToLogin}
      />

      <section className="flex flex-col min-h-screen bg-gray-100 ">
        {isAlertOpen && (
          <AlertaPopup
            message={customAlert.message}
            type={customAlert.type}
            onClose={() => setIsAlertOpen(false)}
          />
        )}
        <nav className="bg-white shadow-md p-4 flex items-center justify-center">
          <BackArrow link="/" />
          <LogoTitle title="Mate Do" />
        </nav>
        <RegisterForm
          setIsAlertOpen={setIsAlertOpen}
          setCustomAlert={setCustomAlert}
        />
        <Footer />
      </section>
    </>
  );
}
