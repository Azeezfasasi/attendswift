import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "next-themes";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')).render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <I18nextProvider i18n={i18n}>
                <App />
        </I18nextProvider>
    </ThemeProvider>
)
