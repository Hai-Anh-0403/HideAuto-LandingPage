import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { HeroSection } from "../HeroSection";

describe("HeroSection", () => {
  it("renders only the cockpit hero with the approved desktop rhythm", () => {
    render(<HeroSection content={enContent.hero} locale="en" release={null} />);

    expect(screen.queryByText("HERO DIRECTION")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "1 · COCKPIT" })).not.toBeInTheDocument();

    const heading = screen.getByRole("heading", { name: /browser automation/i });
    const section = heading.closest("section");

    expect(section).toHaveClass("px-5");
    expect(heading.parentElement).toHaveClass("pt-16", "lg:pt-24");
    expect(heading.parentElement).toHaveClass("max-w-[760px]");
    expect(heading).toHaveClass(
      "mt-10",
      "text-[clamp(42px,6vw,72px)]",
      "font-semibold",
      "leading-[0.94]",
    );
    expect(heading.querySelector(".lg\\:whitespace-nowrap")).toBeInTheDocument();
    expect(screen.getByText(enContent.hero.eyebrow).parentElement).toHaveClass(
      "gap-[11px]",
      "text-[12.5px]",
      "font-semibold",
      "tracking-[0.14em]",
    );
    expect(screen.getByText(enContent.hero.description)).toHaveClass(
      "mt-8",
      "max-w-[620px]",
      "text-[clamp(17px,1.6vw,20px)]",
      "font-semibold",
    );
    expect(screen.getByRole("link", { name: enContent.hero.ctaPrimary })).toHaveClass(
      "text-[17px]",
      "font-semibold",
    );
  });

  it("keeps the Vietnamese final phrase on one desktop line before the final word", () => {
    render(<HeroSection content={viContent.hero} locale="vi" release={null} />);

    const heading = screen.getByRole("heading", { name: /automation trình duyệt/i });

    expect(heading).toHaveClass("text-[clamp(42px,6vw,72px)]");
    expect(heading.querySelector(".lg\\:whitespace-nowrap")).toBeInTheDocument();
  });
});
