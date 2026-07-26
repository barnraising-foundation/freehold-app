# Freehold Alpha Foundation Implementation Plan

> **For Hermes:** Follow the project `CLAUDE.md`; use strict test-first development for all handwritten behavior.

**Goal:** Deliver a runnable local Alpha foundation that lets a synthetic independent writer create Notes/Articles, receives a deterministic canonical path, and downloads a versioned Freehold archive.

**Architecture:** A Next.js TypeScript application hosts a small domain layer independent of React. The UI uses a local browser store only for this foundation, while canonical path and archive creation are pure functions covered by Vitest. The persistence adapter is intentionally replaceable by a future PostgreSQL-backed host implementation.

**Tech stack:** Node 22.22.3, Next.js, React, TypeScript, Vitest, Testing Library, ESLint, Tailwind.

---

## Acceptance criteria

- A new local writer can publish an Article or Note from the compose UI.
- Posts receive opaque IDs and deterministic canonical paths.
- The local writer interface renders saved posts correctly.
- Archive export returns a `freehold.archive` manifest with schema version `1`, writer profile, post metadata, and source bodies.
- All behavior has failing-test evidence, then passes targeted tests and the full quality gate.

## Tasks

### Task 1: Scaffold a reproducible web application

**Files:** create Next application files, `package.json`, `vitest.config.ts`, test setup.

1. Scaffold with Node 22 and npm.
2. Add Vitest and Testing Library tooling.
3. Add scripts for lint, typecheck, test, and build.
4. Confirm the empty suite and production build run under Node 22.

### Task 2: Define canonical content behavior (TDD)

**Files:**
- Create: `src/lib/content.ts`
- Create: `src/lib/content.test.ts`

1. Write failing tests for a valid Note and Article, opaque ID generation, and public paths.
2. Run the test and verify it fails because the module is absent.
3. Implement minimal validation, deterministic public paths, and display helpers.
4. Run targeted and full tests.

### Task 3: Define the archive contract (TDD)

**Files:**
- Create: `src/lib/archive.ts`
- Create: `src/lib/archive.test.ts`

1. Write failing tests that assert a v1 `freehold.archive` manifest faithfully includes profile and source content.
2. Verify the RED failure.
3. Implement the minimal archive builder and JSON serialization.
4. Run targeted and full tests.

### Task 4: Implement a replaceable local store (TDD)

**Files:**
- Create: `src/lib/local-store.ts`
- Create: `src/lib/local-store.test.ts`
- Create: `src/components/freehold-app.tsx`

1. Write failing tests for persistence and reverse-chronological publication order.
2. Verify RED.
3. Implement a browser `localStorage` adapter behind a small interface and seed only when empty.
4. Run targeted and full tests.

### Task 5: Build the writer and reader surfaces

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/p/[slug]/page.tsx`
- Create: `src/app/rss.xml/route.ts`
- Create: `src/components/composer.tsx`
- Create: `src/components/post-list.tsx`

1. Write failing component/route tests for publishing, canonical links, RSS content, and archive download.
2. Verify RED failures.
3. Implement the smallest accessible interface that satisfies them.
4. Run targeted and full tests.

### Task 6: Document and verify the Alpha boundary

**Files:**
- Create: `README.md`
- Modify: `docs/product/alpha-charter.md`

1. Document setup, quality gates, and the distinction between local prototype and hosted Alpha.
2. Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.
3. Start the app and conduct browser QA: publish a Note and Article, open public URLs, retrieve RSS, and export the archive.
4. Commit only verified files, then push `main` to the public GitHub repository.
