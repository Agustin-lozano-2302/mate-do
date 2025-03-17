import { useTranslation } from "react-i18next";

export default function EmpthyState () {
    const { t } = useTranslation();
    return( 
        <div className="text-center py-10 ">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('emptyState.title')}</h3>
        <p className="text-gray-500">{t('emptyState.message')}</p>
      </div>
    )
}