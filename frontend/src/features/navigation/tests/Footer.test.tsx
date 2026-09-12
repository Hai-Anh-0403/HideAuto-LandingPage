import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getContent } from "@/content";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders Vietnamese footer with navigation links and copyright", () => {
    render(<Footer content={getContent("vi")} release={null} />);

    expect(screen.getByRole("navigation", { name: "Điều hướng" })).toBeInTheDocument();
    expect(screen.getByText("Sản phẩm")).toBeInTheDocument();
    expect(screen.getByText("Tài nguyên")).toBeInTheDocument();
    expect(screen.getByText("© 2026 HideAuto")).toBeInTheDocument();
    expect(screen.getByText("Bản beta · nội dung dựng từ source hiện tại")).toBeInTheDocument();
  });

  it("renders English footer with navigation links and copyright", () => {
    render(<Footer content={getContent("en")} release={null} />);

    expect(screen.getByRole("navigation", { name: "Navigation" })).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("© 2026 HideAuto")).toBeInTheDocument();
    expect(screen.getByText("Beta · copy derived from the current source")).toBeInTheDocument();
  });
});
