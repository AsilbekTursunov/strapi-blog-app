import { render, screen } from "../utils/test-utils";
import {  describe, it, expect } from "vitest";
import MultipleInput from "../../components/MultipleInput";
import userEvent from "@testing-library/user-event";
import React from "react";
describe('MultipleInput', () => {
  const renderComponent = () => {

    const InputWrapper = () => {
      const [tags, setTags] = React.useState<string[]>([])
      return (
        <MultipleInput value={tags} onChange={setTags} name="Test" placeholder="Input test" />
      )
    }

    render(<InputWrapper />)

    return {
      user: userEvent.setup(),
      getAddedTags: () => screen.findAllByRole('tag_block'),
      getTag: (label: RegExp) => screen.findAllByRole('tag_block', { name: label }),
      input: screen.getByPlaceholderText('Input test'),
      button: screen.getByRole('add_button'),
      removeBtn: (name: string) => screen.findByRole(`tag_${name}`)
    }
  }
  it('press add button and check values are being added to tags', async () => {
    const { getAddedTags, input, button, user, } = renderComponent()

    await user.type(input, 'one')
    await user.click(button)
    await user.type(input, 'two')
    await user.click(button)
    await user.type(input, 'three')
    await user.click(button)

    const values = ['one', 'two', 'three']
    const allTags = await getAddedTags()

    expect(allTags.length).toBe(3)
    allTags.forEach((tag, index) => {
      expect(tag).toHaveTextContent(values[index])
    })
  })

  it('checking remove button after added', async () => {
    const { getAddedTags, input, button, user, removeBtn } = renderComponent()

    await user.type(input, 'one')
    await user.click(button)
    await user.type(input, 'two')
    await user.click(button) 

    const allTags = await getAddedTags()
    expect(allTags.length).toBe(2)

    const removeThree = await removeBtn('two')
    await user.click(removeThree)

    const lastTags = await getAddedTags()
    expect(lastTags.length).toBe(1)

    lastTags.forEach(tag => {
      expect(tag).not.toHaveTextContent('two')
    })
  })
})