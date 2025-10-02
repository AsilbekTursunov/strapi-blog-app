import { describe, expect, it } from "vitest";
import { render, screen, waitFor, waitForElementToBeRemoved } from '../utils/test-utils'
import PostDetails from "../../pages/PostDetails";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { blogPost } from "../../constants";

describe('PostDetails', () => {
  const renderComponent = () => {
    render(<PostDetails />)
  }

  it('should render no blog found', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.error()
      })
    )
    renderComponent()
    const loader = await screen.findByRole('post_details_loader')
    expect(loader).toBeInTheDocument()
    waitFor(() => {
      const element = screen.getByText('No blog found')
      expect(element).toBeInTheDocument()
    })
  })

  it('should render removing loader if fetching error', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.error()
      })
    )
    renderComponent()
    await waitForElementToBeRemoved(() => screen.queryByRole('post_details_loader'))
  })

  it('should render blog details', async () => {
    server.use(
      http.get('/blogs', () => HttpResponse.json(blogPost))
    )
    renderComponent()
    waitFor(() => {
      const username = screen.getByText('Jamshid')
      const title = screen.getByRole('heading', { name: /improve skills/i })
      expect(username).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })
    await waitForElementToBeRemoved(() => screen.queryByRole('post_details_loader'))
  })
})
