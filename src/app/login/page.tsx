"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MateLoader from "@/components/screenLoader";
import AlertaPopup from "@/components/alert";
import { IAlertaPopupProps } from "@/interface/Alert-Interface";
import LogoTitle from "@/components/logoTitle";
import LoginForm from "@/components/forms/login";
import Footer from "@/components/footer";
import BackArrow from "@/components/backArrow";
import LanguageSwitcher from "@/components/translator/TranlatorButton";

export default function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
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
          <LogoTitle customStyles={true} title={"Mate Do"} />
        </div>
        <LanguageSwitcher />
      </nav>
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-6 bg-gray-100 my-2 ">
          <LoginForm 
            setCustomAlert={setCustomAlert} 
            setIsAlertOpen={setIsAlertOpen} 
          />
        </div>
      </div>
      <Footer />
    </section>
  );
}
