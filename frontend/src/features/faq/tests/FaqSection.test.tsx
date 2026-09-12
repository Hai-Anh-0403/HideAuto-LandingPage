import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { FaqSection } from "../FaqSection";

describe("FaqSection", () => {
  it("renders Vietnamese FAQ items and toggles open/close state on click", () => {
    render(<FaqSection content={viContent.faq} />);

    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Câu hỏi thường gặp")).toBeInTheDocument();

    // Check first question
    const firstQ = viContent.faq.items[0];
    const button = screen.getByText(firstQ.question).closest("button")!;
    expect(button).toBeInTheDocument();

    // First question is open by default
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(firstQ.answer)).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("renders English FAQ items and expands another question on click", () => {
    render(<FaqSection content={enContent.faq} />);

    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Frequently asked")).toBeInTheDocument();

    const secondQ = enContent.faq.items[1];
    const button = screen.getByText(secondQ.question).closest("button")!;
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(secondQ.answer)).toBeInTheDocument();
  });
});
