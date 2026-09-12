import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SchedulePreview } from "../SchedulePreview";

describe("SchedulePreview", () => {
  it("renders the desktop app Schedules cockpit with identical frame and rail to workflow", () => {
    render(<SchedulePreview locale="vi" />);

    expect(screen.getByLabelText("Mô phỏng lịch chạy HideAuto")).toBeInTheDocument();
    expect(screen.getByText("AUTOMATION")).toBeInTheDocument();
    expect(screen.getByText("Schedules")).toBeInTheDocument();
    expect(screen.getByText(/1 active · 1 paused/i)).toBeInTheDocument();

    // Controls
    expect(screen.getByRole("button", { name: "List" })).toHaveClass("is-active");
    expect(screen.getByRole("button", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByText("Asia/Saigon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New schedule" })).toBeInTheDocument();

    // 24H Timeline
    expect(screen.getByText("NEXT 24 H")).toBeInTheDocument();
    expect(screen.getByText("0 runs queued · 0 profile slots")).toBeInTheDocument();
    expect(screen.getAllByText("09:16").length).toBeGreaterThanOrEqual(1);

    // Schedule items from screenshot
    expect(screen.getAllByText("req-facebook").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Run now").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Every day at 13:00").length).toBeGreaterThanOrEqual(1);

    // Inspector Panel
    expect(screen.getByLabelText("Schedule Details Inspector")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Run now" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit schedule" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Overview" })).toHaveClass("is-active");
    expect(screen.getByRole("button", { name: "Run history" })).toBeInTheDocument();
    expect(screen.getByText("BATCH")).toBeInTheDocument();
    expect(screen.getByText("DETAILS")).toBeInTheDocument();
    expect(screen.getByText("NEXT FIRES")).toBeInTheDocument();
    expect(screen.getByText("PROFILES · 1")).toBeInTheDocument();
    expect(screen.getByText("Default profile")).toBeInTheDocument();

    // Rail identical to workflow cockpit: no orange badge 1
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.getByTitle("Schedules")).toHaveClass("active");
  });

  it("toggles schedule switch state and updates active/paused counters and inspector badge", () => {
    render(<SchedulePreview locale="en" />);

    // Initially: 1 active · 1 paused
    expect(screen.getByText(/1 active · 1 paused/i)).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();

    const switchBtns = screen.getAllByRole("switch");
    expect(switchBtns[0]).toHaveAttribute("aria-checked", "true");

    // Toggle off
    fireEvent.click(switchBtns[0]);
    expect(switchBtns[0]).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText(/0 active · 2 paused/i)).toBeInTheDocument();
    expect(screen.getByText("PAUSED")).toBeInTheDocument();

    // Toggle back on via Inspector Pause/Resume button
    const resumeBtn = screen.getByRole("button", { name: "Resume" });
    fireEvent.click(resumeBtn);
    expect(switchBtns[0]).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText(/1 active · 1 paused/i)).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("calls onSwitchTab when clicking the Flow Editor icon on the rail", () => {
    const handleSwitchTab = vi.fn();
    render(<SchedulePreview locale="vi" onSwitchTab={handleSwitchTab} />);

    const flowEditorBtn = screen.getByTitle("Flow Editor");
    fireEvent.click(flowEditorBtn);

    expect(handleSwitchTab).toHaveBeenCalledWith("flow");
  });
});
