import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { CriticSection } from "../CriticSection";

describe("CriticSection", () => {
  it("renders English critic section matching blueprint design", () => {
    render(<CriticSection content={enContent.critic} />);

    expect(screen.getByText(/Why a gate/i)).toBeInTheDocument();
    expect(screen.getByText(/Automation bugs do not show up in your test run/i)).toBeInTheDocument();
    expect(screen.getByText(/How the score works/i)).toBeInTheDocument();
    expect(screen.getByText("resilience")).toBeInTheDocument();
    expect(screen.getByText("anti-detect")).toBeInTheDocument();
    expect(screen.getByText("data-safety")).toBeInTheDocument();
    expect(screen.getByText("cost")).toBeInTheDocument();
    expect(screen.getByText("count of errors")).toBeInTheDocument();
  });

  it("renders Vietnamese critic section matching blueprint design", () => {
    render(<CriticSection content={viContent.critic} />);

    expect(screen.getByText(/Vì sao cần cửa kiểm/i)).toBeInTheDocument();
    expect(screen.getByText(/Lỗi automation không hiện lúc bạn test/i)).toBeInTheDocument();
    expect(screen.getByText(/Cách tính điểm/i)).toBeInTheDocument();
    expect(screen.getByText("đếm lỗi error")).toBeInTheDocument();
  });
});
