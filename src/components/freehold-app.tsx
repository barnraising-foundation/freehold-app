"use client";

import { useMemo, useState } from "react";

import { buildArchive, serializeArchive, type WriterProfile } from "@/lib/archive";
import { createPost, getPublicPath, type Post, type PostKind } from "@/lib/content";
import { loadPosts, savePost } from "@/lib/local-store";

const writer: WriterProfile = {
  id: "writer_local_alpha",
  name: "Avery Writer",
  handle: "avery",
  bio: "Independent writer. Building an archive that can leave with me.",
};

export function FreeholdApp() {
  const [kind, setKind] = useState<PostKind>("note");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState<Post[]>(() =>
    typeof window === "undefined" ? [] : loadPosts(),
  );

  const archive = useMemo(() => buildArchive({ writer, posts }), [posts]);

  function publish() {
    if (!body.trim() || (kind === "article" && !title.trim())) {
      return;
    }

    const post = createPost(
      {
        kind,
        title,
        body,
        publishedAt: new Date().toISOString(),
      },
      () => `post_${crypto.randomUUID().replaceAll("-", "")}`,
    );

    setPosts(savePost(post));
    setTitle("");
    setBody("");
    setKind("note");
  }

  function downloadArchive() {
    const file = new Blob([serializeArchive(archive)], { type: "application/json" });
    const href = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = href;
    link.download = "freehold-archive-v1.json";
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 text-stone-900">
      <header className="border-b border-stone-300 pb-8">
        <p className="font-mono text-sm tracking-wide text-violet-800">FREEHOLD ALPHA · LOCAL FOUNDATION</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">A home for what you write.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">
          Publish a canonical copy, keep the source body, and take a versioned archive with you.
        </p>
      </header>

      <section aria-labelledby="compose-heading" className="mt-10 rounded-2xl border border-stone-300 bg-white p-6 shadow-sm">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wide text-violet-800">WRITE</p>
            <h2 id="compose-heading" className="mt-1 text-2xl font-semibold">{writer.name}</h2>
          </div>
          <label className="text-sm font-medium">
            Format
            <select
              className="ml-2 rounded border border-stone-300 bg-white px-2 py-1"
              value={kind}
              onChange={(event) => setKind(event.target.value as PostKind)}
            >
              <option value="note">Note</option>
              <option value="article">Article</option>
            </select>
          </label>
        </div>

        {kind === "article" ? (
          <label className="mt-6 block text-sm font-medium">
            Title
            <input
              className="mt-2 block w-full rounded border border-stone-300 px-3 py-2 text-base"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        ) : null}

        <label className="mt-6 block text-sm font-medium">
          What belongs in your archive?
          <textarea
            className="mt-2 block min-h-36 w-full rounded border border-stone-300 px-3 py-2 text-base leading-7"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </label>

        <button
          className="mt-5 rounded-full bg-violet-800 px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!body.trim() || (kind === "article" && !title.trim())}
          onClick={publish}
          type="button"
        >
          Publish {kind}
        </button>
      </section>

      <section aria-labelledby="archive-heading" className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-stone-900 p-6 text-stone-50">
        <div>
          <p className="font-mono text-xs tracking-wide text-violet-300">OWNERSHIP CHECK</p>
          <h2 id="archive-heading" className="mt-1 text-xl font-semibold">Your archive is versioned from the start.</h2>
          <p className="mt-1 text-sm text-stone-300">{posts.length} canonical {posts.length === 1 ? "post" : "posts"} · freehold.archive v1</p>
        </div>
        <button className="rounded-full bg-white px-5 py-2.5 font-medium text-stone-950" onClick={downloadArchive} type="button">
          Download archive
        </button>
      </section>

      <section aria-labelledby="archive-list-heading" className="mt-10">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="font-mono text-xs tracking-wide text-violet-800">CANONICAL ARCHIVE</p>
            <h2 id="archive-list-heading" className="mt-1 text-2xl font-semibold">Published work</h2>
          </div>
          <p className="text-sm text-stone-600">Public by choice in this local demo</p>
        </div>
        {posts.length === 0 ? (
          <p className="mt-5 rounded-xl border border-dashed border-stone-300 p-6 text-stone-600">Your first post will appear here with a stable canonical path.</p>
        ) : (
          <ol className="mt-5 space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="rounded-xl border border-stone-300 bg-white p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-violet-800">{post.kind}</p>
                <h3 className="mt-2 text-xl font-semibold">{post.title ?? post.body.slice(0, 72)}</h3>
                <p className="mt-2 whitespace-pre-wrap leading-7 text-stone-700">{post.body}</p>
                <a className="mt-4 inline-block text-sm font-medium text-violet-800 underline" href={getPublicPath(post)}>
                  Open canonical post
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer className="mt-12 border-t border-stone-300 pt-6 text-sm leading-6 text-stone-600">
        This local Alpha foundation stores data only in this browser. Do not use it for private or production writing.
      </footer>
    </main>
  );
}
