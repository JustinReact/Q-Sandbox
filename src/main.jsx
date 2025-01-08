import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ThemeProviderWrapper from './theme-provider'
import { RecoilRoot } from 'recoil'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RecoilRoot>
    <ThemeProviderWrapper>
    <CssBaseline />
    <App />
    </ThemeProviderWrapper>
    </RecoilRoot>
  </React.StrictMode>,
)
