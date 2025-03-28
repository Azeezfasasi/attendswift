import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div>
      <p className='font-bold text-[24px]'>Language Switch:</p>
      <h1>{t('hello')}</h1>
      <button onClick={() => changeLanguage('en')} className='bg-amber-600 py-2 px-3 mr-2 cursor-pointer'>
        English
      </button>
      <button onClick={() => changeLanguage('fr')} className='bg-blue-700 py-2 px-3 cursor-pointer'>
        French
      </button>
    </div>
  );
};

export default LanguageSwitcher;
