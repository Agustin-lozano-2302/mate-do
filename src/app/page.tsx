"use client";

import i18n from "@/context/i18n";
import { I18nextProvider } from "react-i18next";
import Auth from "./auth";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Auth />
    </I18nextProvider>
  );
}
