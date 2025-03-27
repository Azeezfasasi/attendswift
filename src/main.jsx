import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ThemeProvider } from './assets/contextAPI/ThemeContext.jsx'
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById('root')).render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <App />
    </ThemeProvider>
)
