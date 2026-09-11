import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { viContent } from "@/content/vi";
import { ComparisonSection } from "../ComparisonSection";

describe("ComparisonSection", () => {
  it("renders a labelled comparison table with column headers", () => {
    render(<ComparisonSection content={viContent.comparison} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: viContent.comparison.columns[1] })).toBeInTheDocument();
  });
});
