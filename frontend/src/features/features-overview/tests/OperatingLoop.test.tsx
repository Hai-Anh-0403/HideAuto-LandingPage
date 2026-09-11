import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { viContent } from "@/content/vi";
import { OperatingLoop } from "../OperatingLoop";

describe("OperatingLoop", () => {
  it("renders first step by default and changes step on tab click", () => {
    render(<OperatingLoop steps={viContent.overview.steps} />);
    
    // First step is active
    expect(screen.getByText(viContent.overview.steps[0].title)).toBeInTheDocument();

    // Click second step
    const secondTab = screen.getByRole("tab", { name: new RegExp(viContent.overview.steps[1].tag, "i") });
    fireEvent.click(secondTab);

    // Second step content is displayed
    expect(screen.getByText(viContent.overview.steps[1].title)).toBeInTheDocument();
  });
});
