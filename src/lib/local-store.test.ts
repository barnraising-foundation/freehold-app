import { beforeEach, describe, expect, it } from "vitest";

import { createPost } from "./content";
import { loadPosts, savePost } from "./local-store";

beforeEach(() => {
  window.localStorage.clear();
});

describe("local post store", () => {
  it("persists a published post and loads it back", () => {
    const post = createPost(
      {
        kind: "note",
        body: "The source copy is mine.",
        publishedAt: "2026-07-26T12:00:00.000Z",
      },
      () => "post_01JPERSIST",
    );

    savePost(post);

    expect(loadPosts()).toEqual([post]);
  });

  it("loads posts in reverse chronological order", () => {
    const earlier = createPost(
      {
        kind: "note",
        body: "Earlier.",
        publishedAt: "2026-07-25T12:00:00.000Z",
      },
      () => "post_earlier",
    );
    const later = createPost(
      {
        kind: "note",
        body: "Later.",
        publishedAt: "2026-07-26T12:00:00.000Z",
      },
      () => "post_later",
    );

    savePost(earlier);
    savePost(later);

    expect(loadPosts().map((post) => post.id)).toEqual(["post_later", "post_earlier"]);
  });
});
