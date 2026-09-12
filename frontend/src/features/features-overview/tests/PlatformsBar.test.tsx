import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { PlatformsBar } from "../PlatformsBar";

describe("PlatformsBar", () => {
  it("renders English drives bar with all 5 platform badges", () => {
    render(<PlatformsBar platforms={enContent.platforms} />);

    expect(screen.getByText("Drives")).toBeInTheDocument();
    expect(screen.getByText("Hidemium")).toBeInTheDocument();
    expect(screen.getByText("GPM-Login")).toBeInTheDocument();
    expect(screen.getByText("AdsPower")).toBeInTheDocument();
    expect(screen.getByText("Chromium")).toBeInTheDocument();
    expect(screen.getByText("Firefox")).toBeInTheDocument();
    expect(screen.queryByText("CDP")).not.toBeInTheDocument();
    expect(screen.getAllByText("built-in")).toHaveLength(2);
  });

  it("renders Vietnamese drives bar with localized label", () => {
    render(<PlatformsBar platforms={viContent.platforms} />);

    expect(screen.getByText("Điều khiển được")).toBeInTheDocument();
    expect(screen.getByText("Hidemium")).toBeInTheDocument();
  });
});
