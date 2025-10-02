import { describe, expect, it } from "vitest";
import { render, screen } from '../utils/test-utils'
import CreateBlog from "../../components/CreateBlog";
import userEvent from "@testing-library/user-event";
describe('CreateBlog', () => {
  const renderComponent = () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })
    render(<CreateBlog />)
    return {
      user: userEvent.setup(),
      modal: screen.getByRole('openModal'),
      title: () => screen.findByRole('title'),
      description: () => screen.findByRole('description'),
      imageInput: () => screen.findByRole('image_upload'),
      image: () => screen.findByRole('blog_selected_image'),
      submit: () => screen.findByRole('blog_submit'),
      blog: () => screen.findByRole('createBlog'),
      file
    }
  }
  it('get 3 errors if title, description and image are empty', async () => {
    const { user, modal, submit } = renderComponent()
    await user.click(modal)
    // console.log(modal)
    const submitBtn = await submit()
    await user.click(submitBtn)
    const error = await screen.findAllByRole('error')
    expect(error).toHaveLength(3)

  })
  it('get 1 error if title is empty', async () => {
    const { user, modal, title, description, imageInput, submit, file } = renderComponent()
    await user.click(modal)


    const titleInput = await title()
    const descriptionInput = await description()
    const imageIn = await imageInput()
    await user.type(titleInput, 'title')
    await user.type(descriptionInput, 'description')
    await user.upload(imageIn, file)
    const selectedImage = await screen.findByRole('blog_selected_image')

    expect(titleInput).toHaveValue('title')
    expect(descriptionInput).toHaveValue('description')
    expect(selectedImage).toBeInTheDocument()

    const submitBtn = await submit()
    await user.click(submitBtn)
  })

  it('delete selected image if close image is pressed', async () => {
    const { user, modal, imageInput, file } = renderComponent()
    await user.click(modal)
    const imageIn = await imageInput()
    await user.upload(imageIn, file)
    const selectedImage = await screen.findByRole('blog_selected_image')
    const closeImage = await screen.findByRole('close_image')
    await user.click(closeImage)
    expect(selectedImage).not.toBeInTheDocument()
  })
})