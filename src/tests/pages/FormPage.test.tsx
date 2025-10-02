import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FormPage from "../../pages/FormPage";
import { render, screen } from '../utils/test-utils';

describe('FormPage', () => {
  const renderComponent = () => {
    render(<FormPage />)
    return {
      user: userEvent.setup(),
      errors: () => screen.findAllByRole('error'),
      submitBtn: screen.getByRole('form_submit'),
      resetBtn: screen.getByRole('form_reset'),
    }
  }
  it('get 12 errors if all fields are empty', async () => {
    const { user, errors, submitBtn } = renderComponent()
    await user.click(submitBtn)
    const error = await errors()
    expect(error).toHaveLength(12)
  })
  it('if reset button is clicked, form should be reset', async () => {
    const { user, submitBtn, resetBtn } = renderComponent()
    await user.click(submitBtn)
    await user.click(resetBtn)

    const error = screen.queryAllByRole("error")
    expect(error).toHaveLength(0)
  })

  it("reset clears form values", async () => {
    const { user, resetBtn } = renderComponent()

    const firstName = screen.getByPlaceholderText("Firstname")
    await user.type(firstName, "Asilbek")

    expect(firstName).toHaveValue("Asilbek")
    await user.click(resetBtn)
    expect(firstName).toHaveValue("")   // input bo‘sh bo‘lishi kerak
  })

  it("shows error if passwords do not match", async () => {
    const { user, submitBtn } = renderComponent()
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })
    await user.upload(screen.getByRole('profile_image'), file)
    await user.type(screen.getByPlaceholderText("Firstname"), "Asilbek")
    await user.type(screen.getByPlaceholderText("Lastname"), "Tursunov")
    const genderOption = screen.getByRole('combobox', { name: 'Gender' })
    await user.click(genderOption)
    const genderOptionMale = await screen.findByRole('option', { name: 'Male' })
    await user.click(genderOptionMale)
    const phones = screen.getByRole('phones_input')
    const phoneAddBtn = screen.getByRole('phones_add_button')
    await user.type(phones, "998901234567")
    await user.click(phoneAddBtn)
    await user.type(screen.getByPlaceholderText('Enter passport series'), "1234")
    await user.type(screen.getByPlaceholderText('Enter email'), "asilbek.tursunov@gmail.com")
    await user.type(screen.getByPlaceholderText("Enter password"), "secret123")
    await user.type(screen.getByPlaceholderText("Enter confirm password"), "wrongpass")
    const roleOption = screen.getByRole('combobox', { name: 'Role' })
    await user.click(roleOption)
    const roleOptionAdmin = await screen.findByRole('option', { name: 'Admin' })
    await user.click(roleOptionAdmin)
    const cars = screen.getByRole('cars_input')
    const carAddBtn = screen.getByRole('cars_add_button')
    await user.type(cars, "Mersedence")
    await user.click(carAddBtn)
    const skillsOption = screen.getByRole("combobox", { name: /skills/i })
    await user.click(skillsOption)
    const skillsOptionReact = await screen.findByRole('option', { name: /react/i })
    await user.click(skillsOptionReact)
    const skillsOptionNode = await screen.findByRole('option', { name: /node/i })
    await user.click(skillsOptionNode)

    await user.click(submitBtn)
    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument()
  })
})