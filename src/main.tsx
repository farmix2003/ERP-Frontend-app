import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeStore } from './store/ThemeStore.ts'

const queryClient = new QueryClient()

useThemeStore.getState().setTheme(useThemeStore.getState().theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
