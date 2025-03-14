"use client";
import { useState } from "react";
import AlertaPopup from "@/components/alert";
import LogoTitle from "@/components/logoTitle";
import { IAlertaPopupProps, IAlertType } from "@/interface/Alert-Interface";
import BackArrow from "@/components/backArrow";
import PasswordResetForm from "@/components/forms/reset-password";

export default function ResetPassword() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [customAlert, setCustomAlert] = useState<IAlertaPopupProps>({
    message: "",
    type: "info" as IAlertType
  });

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 ">
      {isAlertOpen && (
        <AlertaPopup
          {...customAlert}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      <nav className="bg-white shadow-md p-4 flex items-center justify-center">
        <BackArrow link="/login" />
        <LogoTitle title="Mate Do" />
      </nav>
      <PasswordResetForm setIsAlertOpen={setIsAlertOpen} setCustomAlert={setCustomAlert} />
    </section>
  );
} 