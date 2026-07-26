import { describe, expect, it } from "vitest";

import { buildArchive, serializeArchive } from "./archive";
import { createPost } from "./content";

const writer = {
  id: "writer_01JFREEHOLD",
  name: "Avery Writer",
  handle: "avery",
  bio: "Independent writer and early Freehold participant.",
};

const article = createPost(
  {
    kind: "article",
    title: "A home for what I write",
    body: "The canonical copy lives here.",
    publishedAt: "2026-07-26T12:00:00.000Z",
  },
  () => "post_01JARTICLE",
);

describe("buildArchive", () => {
  it("creates a v1 Freehold archive that faithfully preserves source content", () => {
    const archive = buildArchive({ writer, posts: [article] });

    expect(archive).toMatchObject({
      format: "freehold.archive",
      version: 1,
      writer,
      posts: [article],
    });
    expect(archive.exportedAt).toMatch(/Z$/);
  });

  it("serializes the archive as readable JSON", () => {
    const json = serializeArchive(buildArchive({ writer, posts: [article] }));

    expect(JSON.parse(json)).toMatchObject({
      format: "freehold.archive",
      version: 1,
      posts: [{ body: "The canonical copy lives here." }],
    });
  });
});
