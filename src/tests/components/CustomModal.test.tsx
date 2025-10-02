import { it, describe, expect } from "vitest";
import { render, screen } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import CustomModal from "../../components/Modal";
import React from "react";

describe("CustomModal", () => {
  const renderComponent = () => {
    const content = <div>New Custom modal</div>;
    const user = userEvent.setup();

    // Test uchun state boshqaramiz
    const Wrapper = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          children={content}
        />
      );
    };

    return { user, Wrapper };
  };

  it("default open=true bo‘lsa modal ko‘rinadi, close bosilganda yashirinadi", async () => {
    const { user, Wrapper } = renderComponent();

    render(<Wrapper />);

    const modal = screen.getByRole("modalbox");
    const modalClose = screen.getByRole("modalbox_close");

    // Boshlanishida open=true bo‘lgani uchun block bo‘lishi kerak
    expect(modal).toHaveClass("block");

    // Close tugmasini bosamiz
    await user.click(modalClose);

    // Endi modal yashirin bo‘lishi kerak
    expect(modal).toHaveClass("hidden");
  });
});
