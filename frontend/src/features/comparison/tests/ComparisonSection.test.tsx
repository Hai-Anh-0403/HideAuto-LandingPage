import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { ComparisonSection } from "../ComparisonSection";

describe("ComparisonSection", () => {
  it("renders a labelled comparison table with column headers in Vietnamese", () => {
    render(<ComparisonSection content={viContent.comparison} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: viContent.comparison.columns[1] })
    ).toBeInTheDocument();
    expect(screen.getByText("So sánh")).toBeInTheDocument();
    expect(screen.getByText("Script tự viết chạy được. Đến tháng thứ hai thì không.")).toBeInTheDocument();
    expect(screen.getByText("Dựng trực quan, không cần code")).toBeInTheDocument();
  });

  it("renders a labelled comparison table with column headers in English", () => {
    render(<ComparisonSection content={enContent.comparison} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: enContent.comparison.columns[1] })
    ).toBeInTheDocument();
    expect(screen.getByText("Compare")).toBeInTheDocument();
    expect(screen.getByText("A hand-written script works. By month two it does not.")).toBeInTheDocument();
    expect(screen.getByText("Visual building, no code required")).toBeInTheDocument();
  });
});
