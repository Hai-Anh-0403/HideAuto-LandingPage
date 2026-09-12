import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { StatsBar } from "../StatsBar";

describe("StatsBar", () => {
  it("renders product figures in English with placeholder badge and metrics", () => {
    render(<StatsBar stats={enContent.stats} />);

    expect(screen.getByText("Product figures")).toBeInTheDocument();
    expect(screen.getByText("[placeholder — awaiting real figures]")).toBeInTheDocument();
    expect(screen.getByText("79")).toBeInTheDocument();
    expect(screen.getByText("nodes with a real handler")).toBeInTheDocument();
    expect(screen.getByText("10.000")).toBeInTheDocument();
    expect(screen.getByText("step ceiling per run")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("Critic rules, 4 groups")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("bytes of workflow sent to a server")).toBeInTheDocument();
  });

  it("renders product figures in Vietnamese with placeholder badge and metrics", () => {
    render(<StatsBar stats={viContent.stats} />);

    expect(screen.getByText("Số liệu sản phẩm")).toBeInTheDocument();
    expect(screen.getByText("[chỗ trống — chờ số thật]")).toBeInTheDocument();
    expect(screen.getByText("79")).toBeInTheDocument();
    expect(screen.getByText("node có handler thật")).toBeInTheDocument();
    expect(screen.getByText("10.000")).toBeInTheDocument();
    expect(screen.getByText("bước tối đa mỗi lượt chạy")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("rule Critic, 4 nhóm")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("byte workflow gửi lên server")).toBeInTheDocument();
  });
});
