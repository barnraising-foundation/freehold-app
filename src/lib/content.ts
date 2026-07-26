export type PostKind = "article" | "note";
export type Visibility = "public";

export type DraftPost = {
  kind: PostKind;
  title?: string;
  body: string;
  publishedAt: string;
};

export type Post = DraftPost & {
  id: string;
  slug: string;
  visibility: Visibility;
};

type IdFactory = () => string;

export function createPost(draft: DraftPost, createId: IdFactory): Post {
  if (draft.kind === "article" && !draft.title?.trim()) {
    throw new Error("Articles need a title.");
  }

  const titleForSlug = draft.title?.trim() || draft.body;

  return {
    ...draft,
    title: draft.title?.trim() || undefined,
    body: draft.body.trim(),
    id: createId(),
    slug: slugify(titleForSlug),
    visibility: "public",
  };
}

export function getPublicPath(post: Pick<Post, "id" | "slug">): string {
  return `/p/${post.slug}-${post.id}`;
}

export function isPost(value: unknown): value is Post {
  if (!value || typeof value !== "object") {
    return false;
  }

  const post = value as Partial<Post>;
  return (
    (post.kind === "article" || post.kind === "note") &&
    typeof post.id === "string" &&
    typeof post.slug === "string" &&
    typeof post.body === "string" &&
    typeof post.publishedAt === "string" &&
    post.visibility === "public"
  );
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "post";
}
