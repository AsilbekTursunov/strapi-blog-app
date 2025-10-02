import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from '../utils/test-utils'
import ProfilePage from "../../pages/ProfilePage";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { blogsPosts } from "../../constants";


describe('ProfilePage', () => {
  const renderComponent = () => {
    render(<ProfilePage />)
    return {
      element: screen.getByRole('openModal'),
      user: userEvent.setup()
    }
  }

  it('should render profile page', async () => {
    const { element } = renderComponent()
    expect(element).toBeInTheDocument()
  })

  it('should render opening modal when create button is clicked', async () => {
    const { element, user } = renderComponent()

    await user.click(element)
    const modal = screen.getByRole('createBlog')
    expect(modal).toBeInTheDocument()
  })

  it('should render erros if title, description and image are empty', async () => {
    const { element, user } = renderComponent()

    await user.click(element)
    const modal = screen.getByRole('createBlog')
    expect(modal).toBeInTheDocument()
    const submitBtn = screen.getByRole('blog_submit')
    await user.click(submitBtn)
    const error = await screen.findAllByRole('error')
    expect(error).toHaveLength(3)
  })
  
  it('should render blogs after send blogs of user', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.json(blogsPosts)
      })
    )
    waitFor(() => {
      const blogs = screen.getAllByRole('blog_card')
      expect(blogs.length).toBeGreaterThan(0)
    })
  })

  it('check delete button if click delete button alert dialog should open', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.json(blogsPosts)
      })
    )
    const { user } = renderComponent()
    waitFor(() => {
      const blogs = screen.getAllByRole('blog_card')
      expect(blogs.length).toBeGreaterThan(0)
      const deleteBtns = screen.getAllByRole('delete')
      deleteBtns.forEach(async (btn) => {
        await user.click(btn)
        const alert = await screen.findByRole('alertdialog')
        expect(alert).toBeInTheDocument()
      })
    })
  })
})