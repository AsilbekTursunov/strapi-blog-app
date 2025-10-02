import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PasswordInput } from '../../components/ui/password-input'
import { render, screen } from '../utils/test-utils'

describe('PasswordInput', () => {

  const renderComponent = () => {
    render(<PasswordInput placeholder="Password" />)
    return {
      user: userEvent.setup()
    }
  }

  it('check password input type ', () => {
    renderComponent()
    const input = screen.getByPlaceholderText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('check password changing type ', async () => {
    const { user } = renderComponent()
    const input = screen.getByPlaceholderText('Password')
    const eyeBtn = screen.getByRole('eye-off')
    expect(input).toHaveAttribute('type', 'password')
    await user.click(eyeBtn)
    expect(input).toHaveAttribute('type', 'text')
  })
})