import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { viContent } from "@/content/vi";
import { ProductPreview } from "../ProductPreview";

describe("ProductPreview", () => {
  it("renders the desktop app Flow Editor shell and its read-only React Flow canvas", () => {
    render(<ProductPreview content={viContent.hero} locale="vi" />);

    expect(screen.getByLabelText("Trình soạn flow HideAuto")).toBeInTheDocument();
    expect(screen.getByText("Open & Connect")).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
    expect(screen.getAllByText("Variables")).toHaveLength(2);
    expect(screen.getByText("profile_uuid")).toBeInTheDocument();
    expect(screen.getByText("No workflows yet.")).toBeInTheDocument();

    expect(screen.getByLabelText("Interactive read-only Flow Editor canvas")).toBeInTheDocument();
  });
});
