import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { describe, expect, it } from "vitest"
import App from "../../App"
import { blogsPosts } from "../../constants"
import { server } from "../mocks/server"
import { AllProviders } from "../utils/test-utils"

describe('Routing', () => {
  it('should render home page', async () => {

    server.use(
      http.get('/blogs', () => {
        return HttpResponse.json(blogsPosts)
      })
    )
    render(<>
      <AllProviders route="/">
        <App />
      </AllProviders>
    </>)
    const element = screen.getByText('Home')
    expect(element).toBeInTheDocument()

    const blogs = await screen.findAllByRole('blog_card')
    const pagination = await screen.findByRole('pagination_box')
    expect(blogs).toHaveLength(6)
    expect(pagination).toBeInTheDocument()
  })

  it('should render blog details page', async () => {
    server.use(
      http.get('/blogs/cuy4mqa6epsm7nbzxzsf278d?populate=*', () => {
        return HttpResponse.json({ data: blogsPosts.data.filter((blog) => blog.documentId == "cuy4mqa6epsm7nbzxzsf278d")[0], meta: blogsPosts.meta })
      })
    )
    render(<>
      <AllProviders route="/blog/cuy4mqa6epsm7nbzxzsf278d">
        <App />
      </AllProviders>
    </>)
    const element = await screen.findByRole('button', { name: /follow/i })
    expect(element).toBeInTheDocument()

  })

  it('should render profile page', async () => {
    server.use(
      http.get('/auth/local', () => {
        return HttpResponse.json({
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzU5MDAyMjgyLCJleHAiOjE3NjE1OTQyODJ9.gJctPdcGzrZIvXbvQAU2ZnwLXHu8KdP4yyED9qugQZQ',
          user: {
            id: 2,
            documentId: 'c08gl5796b9a93tfk8ecrg1t',
            username: 'Akmaljon',
            email: 'akmal2002@gmail.com',
            provider: 'local',
            confirmed: true,
            blocked: false,
            createdAt: '2025-09-22T07:25:12.464Z',
            updatedAt: '2025-09-22T07:25:12.464Z',
            publishedAt: '2025-09-22T07:25:12.464Z',
          },
        })
      })
    )
    render(<>
      <AllProviders route="/profile">
        <App />
      </AllProviders>
    </>)
    const user = userEvent.setup()
    expect(screen.getByText('Your all blogs')).toBeInTheDocument()
    const element = await screen.findByRole('signin_form')
    expect(element).toBeInTheDocument()
    const signInBtn = await screen.findByRole('signin_submit')
    expect(signInBtn).toBeInTheDocument()

    const email = screen.getByRole('identifier')
    const password = screen.getByRole('password')

    await user.type(email, 'akmal2002@gmail.com')
    await user.type(password, 'akmal2002')
    await user.click(signInBtn)

    const userBox = await screen.findByRole('user_box')
    expect(userBox).toBeInTheDocument()

    const blogs = await screen.findAllByRole('blog_card')
    expect(blogs.length).toBeGreaterThan(0)

    blogs.forEach((blog) => {
      expect(blog).toHaveTextContent('Удалить')
      expect(blog).toHaveTextContent('Редактировать')
    })  

  })

  it('should render not found page', async () => {
    render(<>
      <AllProviders route="/invalid-route">
        <App />
      </AllProviders>
    </>)
    const element = screen.getByText(/not found/i)
    expect(element).toBeInTheDocument()
  })
})