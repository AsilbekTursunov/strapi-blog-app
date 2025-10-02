import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { blogsPosts } from "../../constants";
import HomePage from "../../pages/HomePage";
import { server } from "../mocks/server";
import { render } from '../utils/test-utils';

describe('HomePage', () => {
  const renderComponent = () => {
    render(<HomePage />)
  }

  it('should render no blogs found', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.error()
      })
    )
    renderComponent()
    const loader = await screen.findByRole('home_page_loader')
    expect(loader).toBeInTheDocument()
    waitFor(() => {
      const element = screen.getByText('No blogs found')
      const trigger = screen.queryByRole('combobox')
      expect(element).toBeInTheDocument()
      expect(trigger).not.toBeInTheDocument()
    })
  }),

    it('should not render combobox if response error', async () => {
      server.use(
        http.get('/blogs', () => {
          return HttpResponse.error()
        })
      )
      renderComponent()
      const loader = await screen.findByRole('home_page_loader')
      expect(loader).toBeInTheDocument()
      waitFor(() => {
        const trigger = screen.queryByRole('combobox')
        expect(trigger).not.toBeInTheDocument()
        const element = screen.getByText('No blogs found')
        expect(element).toBeInTheDocument()
      })
    }),

    it('should render blogs and pagination', async () => {
      server.use(
        http.get('/blogs', () => {
          return HttpResponse.json(blogsPosts)
        })
      )
      renderComponent()
      const blogs = await screen.findAllByRole('blog_card')
      const pagination = await screen.findByRole('pagination_box')
      expect(blogs).toHaveLength(6)
      expect(pagination).toBeInTheDocument()
    })

  it('should render blogs when filter works', async () => {
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.json(blogsPosts)
      })
    )
    renderComponent()
    const user = userEvent.setup()
    const trigger = await screen.findByRole('combobox')
    const blogs = await screen.findAllByRole('blog_card')
    const pagination = await screen.findByRole('pagination_box')
    expect(blogs.length).toBeGreaterThan(0)
    expect(pagination).toBeInTheDocument()

    await user.click(trigger)
    const options = await screen.findAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it.each([
    { value: /javascript/i, label: 'Javascript' },
    { value: /node/i, label: 'Node.js' },
    { value: /ai/i, label: 'AI' },
  ])(' cleck when option $label click loading and combobox textcontent equal $label', async ({ value, label }) => {
    const relatedBlogs = blogsPosts.data.filter((blog) => value.test(blog.slug))
    server.use(
      http.get('/blogs', () => {
        return HttpResponse.json({ data: relatedBlogs, meta: blogsPosts.meta })
      })
    )
    renderComponent()
    const user = userEvent.setup()
    const trigger = await screen.findByRole('combobox')
    await user.click(trigger)
    const options = await screen.findAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
    const option = screen.getByRole('option', { name: value })
    await user.click(option)
    const triggerChanged = await screen.findByRole('combobox')
    expect(triggerChanged).toHaveTextContent(label) 
    const blogs = await screen.findAllByRole('blog_card')
    expect(blogs.length).toBeGreaterThan(0)
    const pagination = await screen.findByRole('pagination_box')
    expect(pagination).toBeInTheDocument()
    expect(blogs.length).toBeGreaterThanOrEqual(1)
  })
})