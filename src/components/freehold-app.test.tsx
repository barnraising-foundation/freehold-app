import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { FreeholdApp } from "./freehold-app";

beforeEach(() => {
  window.localStorage.clear();
});

describe("FreeholdApp", () => {
  it("publishes a Note to the writer's canonical local archive", () => {
    render(<FreeholdApp />);

    fireEvent.change(screen.getByLabelText("What belongs in your archive?"), {
      target: { value: "A canonical home comes first." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish note" }));

    expect(screen.getByRole("heading", { name: "A canonical home comes first." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open canonical post" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/p\/a-canonical-home-comes-first-post_/),
    );
  });

  it("offers a versioned Freehold archive download", () => {
    render(<FreeholdApp />);

    expect(screen.getByRole("button", { name: "Download archive" })).toBeEnabled();
  });
});
