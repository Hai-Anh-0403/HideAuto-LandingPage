import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "../SectionHeading";

describe("SectionHeading", () => {
  it("renders title, eyebrow, and description with correct unified styles", () => {
    render(
      <SectionHeading
        eyebrow="OPERATING LOOP"
        title="Build · review · run at scale · commit."
        description="The four things you do every day."
        id="features-title"
      />,
    );

    const eyebrow = screen.getByText("OPERATING LOOP");
    expect(eyebrow).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 2, name: /build · review/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "features-title");
    expect(heading).toHaveClass(
      "font-[var(--font-barlow-condensed)]",
      "text-3xl",
      "lg:text-5xl",
      "font-bold",
      "uppercase",
    );

    const description = screen.getByText("The four things you do every day.");
    expect(description).toBeInTheDocument();
  });

  it("renders without eyebrow or description when not provided", () => {
    render(<SectionHeading title="Frequently Asked Questions" />);

    expect(screen.getByRole("heading", { level: 2, name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(screen.queryByText("OPERATING LOOP")).not.toBeInTheDocument();
  });
});
