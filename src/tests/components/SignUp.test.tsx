import { it, describe, expect } from "vitest";
import { render, screen } from "../utils/test-utils";
import SignUp from "../../components/SignUp";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe('SignUp', () => {
  const renderComponent = () => {


    render(<SignUp onChange={() => { }} onSuccess={() => { }} />)
    return {
      user: userEvent.setup(),
      signUp: screen.getByRole('signup'),
      name: screen.getByRole('username'),
      email: screen.getByRole('email'),
      password: screen.getByRole('password'),
      errors: () => screen.findAllByRole('error')
    }
  }
  it('check register errors are visiable when sinup btn is clicked if input values is empty', async () => {
    const { signUp, user, errors, name, email, password } = renderComponent()

    await user.click(signUp)

    const errorMsgs = await errors()
    expect(errorMsgs).toHaveLength(3)

    await user.type(name, 'Asilbek')
    await user.click(signUp)

    const errMsgsAfterName = await errors()
    expect(errMsgsAfterName).toHaveLength(2)

    await user.type(email, 'asilbek@gmail.com')
    await user.click(signUp)

    const errMsgsAfterEmail = await errors()
    expect(errMsgsAfterEmail).toHaveLength(1)

    await user.type(password, 'asilbek@1510')
    await user.click(signUp)
 
  })

  it('test  user exist  error if user email is already exist', async () => {
    const { signUp, user,  name, email, password } = renderComponent()

    server.use(http.post('/auth/local/register', () => HttpResponse.json(
      { error: { message: 'Email is already registered please try another email' } }, // shu format kerak
      { status: 400 }
    )))

    await user.type(name, 'Asilbek')
    await user.type(email, 'asilbek@gmail.com')
    await user.type(password, 'asilbek@1510')
    await user.click(signUp)

    const errorMsgs = await screen.findByRole('register_error')
    expect(errorMsgs).toHaveTextContent(/email is already/i)
  })
})