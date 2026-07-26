import { isPost, type Post } from "./content";

const POSTS_KEY = "freehold.alpha.posts.v1";

export function loadPosts(): Post[] {
  const raw = window.localStorage.getItem(POSTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isPost)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch {
    return [];
  }
}

export function savePost(post: Post): Post[] {
  const posts = [post, ...loadPosts().filter((existing) => existing.id !== post.id)].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  );
  window.localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return posts;
}
