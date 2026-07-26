import type { Post } from "./content";

export type WriterProfile = {
  id: string;
  name: string;
  handle: string;
  bio: string;
};

export type FreeholdArchive = {
  format: "freehold.archive";
  version: 1;
  exportedAt: string;
  writer: WriterProfile;
  posts: Post[];
};

export function buildArchive({
  writer,
  posts,
}: {
  writer: WriterProfile;
  posts: Post[];
}): FreeholdArchive {
  return {
    format: "freehold.archive",
    version: 1,
    exportedAt: new Date().toISOString(),
    writer,
    posts,
  };
}

export function serializeArchive(archive: FreeholdArchive): string {
  return JSON.stringify(archive, null, 2);
}
