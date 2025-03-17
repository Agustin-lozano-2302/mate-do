"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistroAlertModal from "@/components/registerAlert/registerAlert";
import Footer from "@/components/footer";
import BackArrow from "@/components/backArrow";
import LogoTitle from "@/components/logoTitle";
import RegisterForm from "@/components/forms/register";
import AlertaPopup from "@/components/alert";
import { IAlertaPopupProps } from "@/interface/Alert-Interface";
import LanguageSwitcher from "@/components/translator/TranlatorButton";

export default function Register() {
  const { t } = useTranslation();
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

      <section className="flex flex-col min-h-screen bg-gray-100">
        {isAlertOpen && (
          <AlertaPopup
            message={customAlert.message}
            type={customAlert.type}
            onClose={() => setIsAlertOpen(false)}
          />
        )}
        <nav className="bg-white shadow-md p-4 flex items-center justify-between px-6">
          <div className="flex items-center">
            <BackArrow link="/" />
            <LogoTitle customStyles={true} title="Mate Do" />
          </div>
          <LanguageSwitcher />
        </nav>
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
            <RegisterForm
              setIsAlertOpen={setIsAlertOpen}
              setCustomAlert={setCustomAlert}
            />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
