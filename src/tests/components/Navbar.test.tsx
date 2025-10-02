import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import customSystem from "../../../theme";
import Navbar from "../../components/Navbar";
import { UserContextProvider } from "../../provider/UserContext";
import { store } from "../../store";

const queryClient = new QueryClient()

describe('Navbar', () => {
  
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChakraProvider value={customSystem}>
            <QueryClientProvider client={queryClient}>
              <UserContextProvider>
                <Navbar />
              </UserContextProvider>
            </QueryClientProvider>
          </ChakraProvider>
        </Provider>
      </BrowserRouter>
    )

    return {
      boytiBtn: screen.getByRole('button', { name: 'Войти' }),
      user: userEvent.setup()
    }
  }

  it('should render sidebar trigger if user click menu-trigger', async () => {
    const { boytiBtn } = renderComponent()
    expect(boytiBtn).toBeInTheDocument()
  })

  it('should render boyti button if user is not logged in', async () => {
    const { boytiBtn, user } = renderComponent()
    expect(boytiBtn).toBeInTheDocument()

    await user.click(boytiBtn)
    const signIn = await screen.findByRole('signin_form')
    expect(signIn).toBeInTheDocument()

    const signInBtn = screen.getByRole('signin_submit')
    expect(signInBtn).toBeInTheDocument()
    expect(signInBtn).toBeDisabled()

    const signUpBtn = await screen.findByRole('signup_link')
    expect(signUpBtn).toBeInTheDocument()
    await user.click(signUpBtn)

    const signUp = await screen.findByRole('signup_form')
    const signInBtnHidden = screen.queryByRole('signin_submit')

    expect(signInBtnHidden).not.toBeInTheDocument()
    expect(signUp).toBeInTheDocument()

    const signInLink = await screen.findByRole('signin_link')
    expect(signInLink).toBeInTheDocument()
    await user.click(signInLink)
    const signInForm = await screen.findByRole('signin_form')
    const signUpForm = screen.queryByRole('signup_form')

    expect(signInForm).toBeInTheDocument()
    expect(signUpForm).not.toBeInTheDocument()
  })

  it('should render user box if user is signup', async () => {
    const { boytiBtn, user } = renderComponent()
    expect(boytiBtn).toBeInTheDocument()

    await user.click(boytiBtn)
    const signIn = await screen.findByRole('signin_form')
    expect(signIn).toBeInTheDocument()

    const signInBtn = screen.getByRole('signin_submit')
    expect(signInBtn).toBeInTheDocument()
    expect(signInBtn).toBeDisabled()

    const email = screen.getByRole('identifier')
    const password = screen.getByRole('password')

    await user.type(email, 'asilbek@gmail.com')
    await user.type(password, 'asilbek@1510')

    expect(signInBtn).not.toBeDisabled()
    await user.click(signInBtn)
    const userBox = await screen.findByRole('user_box')
    expect(userBox).toBeInTheDocument()

    const signUpBtn = await  screen.findByRole('signup_link')
    expect(signUpBtn).toBeInTheDocument()
    await user.click(signUpBtn)
    const signUp = await screen.findByRole('signup_form')
    const registerBtn = await screen.findByRole('signup')
    expect(registerBtn).toBeInTheDocument()
    expect(registerBtn).not.toBeDisabled()
    expect(signUp).toBeInTheDocument()

    // if user click signup btn get error message

    await user.click(registerBtn)
    expect(await screen.findByText('Введите свое имя')).toBeInTheDocument()
    expect(await screen.findByText('Введите свою почту')).toBeInTheDocument()
    expect(await screen.findByText('Введите свой пароль')).toBeInTheDocument()

    // if user fill all inputs
    const name = screen.getByRole('username')
    const registerEmail = screen.getByRole('email')
    const registerPassword = screen.getByRole('password')

    await user.type(name, 'Alibek')
    await user.type(registerEmail, 'alibek@gmail.com')
    await user.type(registerPassword, 'alibek@2005')
    await user.click(registerBtn)
    const userBoxAfterRegister = await screen.findByRole('user_box')
    expect(userBoxAfterRegister).toBeInTheDocument()
    expect(registerBtn).not.toBeDisabled()
  }) 

})