import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import { UserCard } from "./UserCard";

afterEach(cleanup);

describe("UserCard", () => {
  it("renders the name", () => {
    render(<UserCard name="Alice" bio="Engineer" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Alice");
  });

  it("renders the bio", () => {
    render(<UserCard name="Alice" bio="Engineer" />);
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });
});
