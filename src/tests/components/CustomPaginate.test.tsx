import { describe, expect, it } from "vitest";
import { render, screen } from '../utils/test-utils'
import CustomPaginate from "../../components/CustomPaginate";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe('CustomPaginate', () => {
  const renderComponent = () => {

    const CustomPaginateWrapper = () => {
      const [page, setPage] = useState(1)

      return (
        <CustomPaginate count={36} pageSize={6} page={page} onNext={() => setPage(page + 1)} onPrev={() => setPage(page - 1)} onSelect={(page) => setPage(page)} />
      )
    }
    render(<CustomPaginateWrapper />)
    return {
      activeBtn: screen.getByRole('active'),
      pageBtns: screen.getAllByRole('page'),
      prevBtn: screen.getByRole('prev'),
      nextBtn: screen.getByRole('next'),
      user: userEvent.setup(),
    }
  }
  it('active page is change when page selected', () => {
    const { activeBtn, pageBtns, prevBtn, nextBtn } = renderComponent()
    expect(activeBtn).toBeInTheDocument()

    // activebtn role boshqa bo'lganligi uchun +1 qo'shamiz
    expect(pageBtns.length + 1).toBe(5)
    expect(prevBtn).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })

  it.each([
    { label: '2', page: 2 },
    { label: '3', page: 3 },
    { label: '4', page: 4 },
    { label: '6', page: 6 }
  ])('change active page', async ({ label }) => {
    const { user, pageBtns } = renderComponent()

    const page = pageBtns.find(btn => btn.textContent === label)!
    await user.click(page)

    // DOM qayta render bo‘lgandan keyin yangi active elementni olish
    const activeBtn = await screen.findByRole('active')

    expect(activeBtn).toHaveTextContent(label)
  })
})