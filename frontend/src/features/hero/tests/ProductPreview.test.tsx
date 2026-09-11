import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { viContent } from "@/content/vi";
import { ProductPreview } from "../ProductPreview";

describe("ProductPreview", () => {
  it("renders the desktop app Flow Editor shell and its read-only React Flow canvas", () => {
    render(<ProductPreview content={viContent.hero} locale="vi" />);

    expect(screen.getByLabelText("Trình soạn flow HideAuto")).toBeInTheDocument();
    expect(screen.getAllByText("Open & Connect").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Outline")).toHaveClass("is-active");
    expect(screen.getByText("Variables")).toBeInTheDocument();
    expect(screen.getAllByText("Start").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Stop")).toBeInTheDocument();
    expect(screen.getByText("add log")).toBeInTheDocument();

    // Default dock tab is LOG
    expect(screen.getByRole("button", { name: "LOG" })).toHaveClass("active");

    expect(screen.getByLabelText("Interactive read-only Flow Editor canvas")).toBeInTheDocument();
  });
});
