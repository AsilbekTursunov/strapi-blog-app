import { ChakraProvider } from "@chakra-ui/react"
import { configureStore } from "@reduxjs/toolkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, type RenderOptions } from "@testing-library/react"
import React, { type PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import customSystem from "../../../theme"
import { store as defaultStore } from "../../store"
import userReducer from "../../store/user.slice"

// QueryClient har bir test uchun yangi instance
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      user: {
        id: 2,
        documentId: 'c08gl5796b9a93tfk8ecrg1t',
        username: 'Akmaljon',
        email: 'akmal2002@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2025-09-22T07:25:12.464Z',
        updatedAt: '2025-09-22T07:25:12.464Z',
        publishedAt: '2025-09-22T07:25:12.464Z',
      },
      isLogin: true,
      error: null
    }
  }
})

export const AllProviders = ({ children, route }: { route?: string } & PropsWithChildren) => {
  const queryClient = createTestQueryClient()

  return (
    <MemoryRouter initialEntries={[route || '/']}>
      <Provider store={store}>
        <ChakraProvider value={customSystem}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </MemoryRouter>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options })

// testing-library api’sini re-export qilib yuboramiz
export * from "@testing-library/react"
export { customRender as render }


export const renderWithProviders = (children: React.ReactNode) => {
  const queryClient = createTestQueryClient()

  return <>
    <BrowserRouter>
      <Provider store={defaultStore}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={customSystem}>
            {children}
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>

  </>
}

