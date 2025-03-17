"use client"
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = async () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    await i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 text-white rounded-md transition"
    >
      <Image 
        src="/icons/translate.png" 
        alt="language" 
        width={40} 
        height={40} 
        quality={100} 
        className="mb-1" 
      />
    </button>
  );
}
