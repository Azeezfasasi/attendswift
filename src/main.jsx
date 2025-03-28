import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "next-themes";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
// import TranslationProvider from './assets/component/translation/TranslationProvider.jsx';

createRoot(document.getElementById('root')).render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <I18nextProvider i18n={i18n}>
            {/* <TranslationProvider> */}
                <App />
            {/* </TranslationProvider> */}
        </I18nextProvider>
    </ThemeProvider>
)
