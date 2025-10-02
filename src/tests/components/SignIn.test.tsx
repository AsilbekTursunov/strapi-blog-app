import { it, describe, expect } from "vitest";
import { render, screen } from '../utils/test-utils'
import SignIn from "../../components/SignIn";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
describe('SignIn', () => {

  const renderComponent = () => {

    render(
      <SignIn onChange={() => { }} onSuccess={() => { }} />
    )
    return {
      signIn: screen.getByRole('signin_submit'),
      user: userEvent.setup()
    }
  }
  it('login button  is disabled if input values is empty', () => {
    const { signIn } = renderComponent()
    expect(signIn).toBeDisabled()
  })

  
  it('if not values of inputs submit_btn is disabled if write something else disabled=false', async () => {
    const { user, signIn } = renderComponent()
    const email = screen.getByRole('identifier')
    const password = screen.getByRole('password')

    await user.type(email, 'asilbek@gmail.com')
    await user.type(password, 'asilbek@1510')

    expect(signIn).not.toBeDisabled()
    await user.click(signIn)
    expect(signIn).toBeDisabled()
  })

  it('if return error from response check it', async () => {
    server.use(http.post('/auth/local', () => HttpResponse.json(
      { error: { message: 'Not Authorized' } }, // shu format kerak
      { status: 400 }
    )))
    const { user, signIn } = renderComponent()
    const email = screen.getByRole('identifier')
    const password = screen.getByRole('password')

    await user.type(email, 'asilbek@gmail.com')
    await user.type(password, 'asilbek@1510')

    expect(signIn).not.toBeDisabled()
    await user.click(signIn)
    const errorText = await screen.findByText('Not Authorized')
    expect(errorText).toBeInTheDocument()
  })
})