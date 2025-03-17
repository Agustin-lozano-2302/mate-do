import { useTranslation } from "react-i18next";

export default function Footer () {
    const { t } = useTranslation();
    return (
        <footer className="bg-white text-center text-sm p-4 border-t">
        &copy; {new Date().getFullYear()} Mate Do. {t('common.allRightsReserved')}    
      </footer>
    )
}