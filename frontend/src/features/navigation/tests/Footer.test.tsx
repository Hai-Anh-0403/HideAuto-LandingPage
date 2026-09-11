import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getContent } from "@/content";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("uses localized navigation and exposes the alternate locale", () => {
    render(<Footer content={getContent("vi")} release={null} />);

    expect(screen.getByRole("navigation", { name: "Điều hướng" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en");
  });
});
