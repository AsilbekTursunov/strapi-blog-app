import { createListCollection } from "@chakra-ui/react";
import { it, describe, expect, vi } from "vitest";
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import CustomSelect from "../../components/CustomSelect";

describe('CustomSelect', () => {

  const renderComponent = () => {
    const onChange = vi.fn()

    const SelectWrapper = () => {

      const gender = createListCollection({
        items: [
          { label: "One", value: "one" },
          { label: "Two", value: "two" },
          { label: "Three", value: "three" },
          { label: "Four", value: "four" },
        ],
      })

      return (
        <CustomSelect
          title="Gender"
          name={'Gender'}
          onValueChange={(val => onChange(val.value[0]))}
          collection={gender}
          width={'full'}
        />
      )
    }
    render(<SelectWrapper />)
    return {
      trigger: screen.getByRole('combobox'),
      findOption: (label: RegExp) => screen.findByRole('option', { name: label }),
      findOptions: () => screen.findAllByRole('option'),
      user: userEvent.setup(),
      onChange
    }
  }
  it('checking select is working correct', () => {
    const { trigger } = renderComponent()

    expect(trigger).toHaveTextContent('Gender')
  })

  it('when click trigger options will be visible', async () => {
    const { trigger, user, findOptions } = renderComponent()

    await user.click(trigger)
    const options = await findOptions()
    expect(options.length).toBe(4)
  })

  it.each([
    { label: 'One', name: /one/i },
    { label: 'Two', name: /two/i },
    { label: 'Three', name: /three/i },
    { label: 'Four', name: /four/i }
  ])('when other $label is clicked trigger textcontent will be equal to that', async ({ label, name }) => {
    const { trigger, user, findOption } = renderComponent()

    await user.click(trigger)
    const option = await findOption(name)

    await user.click(option)
    expect(trigger).toHaveTextContent(label) 
  })
})