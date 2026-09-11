import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { viContent } from "@/content/vi";
import { FaqSection } from "../FaqSection";

describe("FaqSection", () => {
  it("renders accordion items and toggles open/close state on click", () => {
    render(<FaqSection content={viContent.faq} />);

    // Check first question
    const firstQ = viContent.faq.items[0];
    const button = screen.getByRole("button", { name: new RegExp(firstQ.question, "i") });
    expect(button).toBeInTheDocument();

    // First question is open by default
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(firstQ.answer)).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
