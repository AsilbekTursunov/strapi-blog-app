import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, FileUploadRootProvider } from '@chakra-ui/react'
import customSystem from '../theme'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './provider/UserContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={customSystem} >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </QueryClientProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
