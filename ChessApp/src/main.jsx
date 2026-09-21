import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from "@clerk/react"
import './index.css'
import App from './App.jsx'
import theme from './theme'

console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <App />
    </ClerkProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
