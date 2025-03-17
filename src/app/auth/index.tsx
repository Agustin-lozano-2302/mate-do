"use client";
import Button from "@/components/button";
import Footer from "@/components/footer";
import LogoTitle from "@/components/logoTitle";
import MateLoader from "@/components/screenLoader";
import { supabase } from "@/context/supabase";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/translator/TranlatorButton";

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initSupabase = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
      };

      initSupabase();
    }
  }, []);

  if (loading) {
    return <MateLoader />;
  }

  return (
    <section className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-6">
        <LogoTitle title="Mate Do" />
        <LanguageSwitcher />
      </nav>
      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 space-y-6">
        <h2 className="playfairDisplay text-3xl font-bold text-gray-800">
          {t('auth.title')}
        </h2>
        <p className="playfairDisplay text-gray-600">
          {t('auth.description')}
        </p>
        <div className="w-full max-w-xs flex flex-col gap-2">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              {t('auth.signIn')}
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" className="w-full">
              {t('auth.signUp')}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}
