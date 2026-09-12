import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { PricingSection } from "../PricingSection";

describe("PricingSection", () => {
  it("renders English beta pricing section with features and CTA", () => {
    render(
      <PricingSection
        content={enContent.pricing}
        locale="en"
        release={null}
      />
    );

    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Free for the whole beta.")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Unlimited workflows & profiles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download the beta/i })).toHaveAttribute(
      "href",
      "#download"
    );
  });

  it("renders Vietnamese beta pricing section with features and CTA", () => {
    render(
      <PricingSection
        content={viContent.pricing}
        locale="vi"
        release={null}
      />
    );

    expect(screen.getByText("Giá")).toBeInTheDocument();
    expect(screen.getByText("Miễn phí trong suốt beta.")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Không giới hạn workflow & profile")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tải bản beta/i })).toHaveAttribute(
      "href",
      "#download"
    );
  });
});
