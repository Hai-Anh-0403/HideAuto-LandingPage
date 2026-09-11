import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "../Header";

const testNav = {
  compare: "Compare",
  critic: "Critic",
  features: "Features",
  pricing: "Pricing",
  faq: "FAQ",
  download: "Download",
};

describe("Header", () => {
  it("uses the approved desktop spacing and typography", () => {
    render(<Header locale="vi" navigation={testNav} />);

    const header = screen.getByRole("banner");
    const headerContent = header.firstElementChild;

    expect(headerContent).toHaveClass("h-16", "px-4", "lg:px-6");
    expect(headerContent).not.toHaveClass("mx-auto", "max-w-[1200px]");
    expect(screen.getByText("HideAuto")).toHaveClass(
      "text-[22px]",
      "font-semibold",
      "tracking-[0.01em]",
    );
    expect(screen.getByRole("link", { name: "VI" })).toHaveClass("text-[12.5px]", "font-semibold");
    expect(screen.getByRole("link", { name: "EN" })).toHaveClass("text-[12.5px]", "font-semibold");
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toHaveClass(
      "text-[14px]",
      "font-semibold",
    );
    expect(screen.getByRole("link", { name: "Download" })).toHaveClass("text-[15px]", "font-semibold");
    expect(screen.getByRole("link", { name: "VI" })).toHaveClass(
      "bg-[var(--brand-tint-strong)]",
      "text-[var(--brand-strong)]",
    );
    expect(screen.getByRole("link", { name: "EN" })).toHaveClass(
      "text-[var(--text-secondary)]",
    );
  });

  it("does not expose a theme switcher in dark-only mode", () => {
    render(<Header locale="vi" navigation={testNav} />);

    expect(screen.queryByRole("button", { name: "LIGHT" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "DARK" })).not.toBeInTheDocument();
  });

  it("opens the mobile navigation with accessible state", () => {
    render(<Header locale="vi" navigation={testNav} />);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      within(screen.getByRole("navigation", { name: "Mobile navigation" })).getByRole(
        "link",
        { name: "Features" },
      ),
    ).toBeVisible();
  });
});
