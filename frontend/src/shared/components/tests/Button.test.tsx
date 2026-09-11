import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("renders a native button with its accessible name", () => {
    render(<Button type="button">Download beta</Button>);

    expect(
      screen.getByRole("button", { name: "Download beta" }),
    ).toBeEnabled();
  });

  it("renders a link when navigation is requested", () => {
    render(<Button href="/vi#download">View download</Button>);

    expect(screen.getByRole("link", { name: "View download" })).toHaveAttribute(
      "href",
      "/vi#download",
    );
  });
});
