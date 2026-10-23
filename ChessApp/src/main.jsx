import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import theme from './theme'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
    <App />
    </AuthProvider>
    <ToastContainer/>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
