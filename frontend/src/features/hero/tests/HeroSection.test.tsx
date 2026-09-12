import { fireEvent, render, screen } from "@testing-library/react";
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
      "font-bold",
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
      "text-[clamp(15px,1.4vw,17px)]",
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

  it("renders the 4 mock tab buttons and allows switching active state", () => {
    render(<HeroSection content={enContent.hero} locale="en" release={null} />);

    const flowBtn = screen.getByRole("button", { name: "Flow editor" });
    const aiBtn = screen.getByRole("button", { name: "AI" });
    const gitBtn = screen.getByRole("button", { name: "Git" });
    const schedBtn = screen.getByRole("button", { name: "Schedules" });

    expect(flowBtn).toBeInTheDocument();
    expect(aiBtn).toBeInTheDocument();
    expect(gitBtn).toBeInTheDocument();
    expect(schedBtn).toBeInTheDocument();

    expect(flowBtn).toHaveClass("bg-[#e7e8ea]", "text-[#0f1114]");
    expect(aiBtn).toHaveClass("bg-transparent");

    // Switching to Schedules displays SchedulePreview
    fireEvent.click(schedBtn);
    expect(schedBtn).toHaveClass("bg-[#e7e8ea]", "text-[#0f1114]");
    expect(screen.getByLabelText("HideAuto Schedules Cockpit")).toBeInTheDocument();
    expect(screen.getByText("NEXT 24 H")).toBeInTheDocument();
  });
});
