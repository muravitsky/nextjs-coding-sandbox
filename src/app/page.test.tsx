import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import Home from "./page";

afterEach(cleanup);

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Next.js Coding Sandbox"
    );
  });

  it("renders the description", () => {
    render(<Home />);
    expect(screen.getByText(/boilerplate with Tailwind CSS/i)).toBeInTheDocument();
  });
});
