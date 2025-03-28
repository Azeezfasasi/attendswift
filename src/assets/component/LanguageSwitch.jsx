import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    localStorage.setItem('i18nextLng', lng);
    window.location.reload(); // Force page reload
  };

  return (
    <div>
      <p className='font-bold text-[24px]'>{t("Language Switch")}:</p>
      <button onClick={() => changeLanguage('en')} className='bg-amber-600 py-2 px-3 mr-2 cursor-pointer rounded'>
        {t("English")}
      </button>
      <button onClick={() => changeLanguage('fr')} className='bg-blue-500 py-2 px-3 cursor-pointer mr-2 rounded'>
        {t("French")}
      </button>
      <button onClick={() => changeLanguage('ha')} className='bg-cyan-500 py-2 px-3 cursor-pointer mr-2 rounded'>
        {t("Hausa")}
      </button>
      <button onClick={() => changeLanguage('yo')} className='bg-emerald-500 py-2 px-3 cursor-pointer mr-2 rounded'>
        {t("Yoruba")}
      </button>
      <button onClick={() => changeLanguage('ig')} className='bg-fuchsia-500 py-2 px-3 cursor-pointer mr-2 rounded'>
        {t("Igbo")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
