import { describe, expect, it } from "vitest";

import {
  createPost,
  getPublicPath,
  isPost,
  type DraftPost,
} from "./content";

describe("createPost", () => {
  it("creates a canonical Article with a stable opaque ID and public path", () => {
    const draft: DraftPost = {
      kind: "article",
      title: "A home for what I write",
      body: "Freehold starts with a canonical home for writers.",
      publishedAt: "2026-07-26T12:00:00.000Z",
    };

    const post = createPost(draft, () => "post_01JABCDEF123");

    expect(post).toEqual({
      ...draft,
      id: "post_01JABCDEF123",
      slug: "a-home-for-what-i-write",
      visibility: "public",
    });
    expect(getPublicPath(post)).toBe("/p/a-home-for-what-i-write-post_01JABCDEF123");
  });

  it("creates a Note without requiring a title", () => {
    const post = createPost(
      {
        kind: "note",
        body: "A small thought belongs to its author too.",
        publishedAt: "2026-07-26T12:00:00.000Z",
      },
      () => "post_01JNOTE123",
    );

    expect(post.title).toBeUndefined();
    expect(post.slug).toBe("a-small-thought-belongs-to-its-author-too");
    expect(isPost(post)).toBe(true);
  });

  it("rejects an Article without a title", () => {
    expect(() =>
      createPost(
        {
          kind: "article",
          body: "Body without a headline.",
          publishedAt: "2026-07-26T12:00:00.000Z",
        },
        () => "post_invalid",
      ),
    ).toThrow("Articles need a title.");
  });
});
