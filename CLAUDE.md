# Freehold App

## Mission

Freehold is the internet without landlords: an open ecosystem for creator-owned publishing. The first product serves independent writers, but it is explicitly the first Freehold host—not a separate tool that will later be converted into a social platform.

The canonical commitments are in `docs/product/alpha-charter.md` and the implementation plan in `docs/plans/2026-07-26-alpha-foundation.md`.

## Repository boundaries

- This is the public reference application repository: `github.com/barnraising-foundation/freehold-app`.
- Keep it separate from `../freehold` (strategy, research, whitepaper) and `../freehold/site` (the deployed marketing website).
- Never copy credentials, mailing-list data, production exports, or private strategy notes into this public repository.
- Use synthetic fixture data only.

## Engineering rules

- Pin and use Node 22 via `.nvmrc` or the explicit Homebrew Node 22 PATH.
- Use TypeScript with strict checking; do not use `any` to bypass a type error.
- Test behavior first: write a failing Vitest test, run it, implement minimally, then run the targeted and full suite.
- Preserve content fidelity: store source body, publication time, visibility, and stable opaque IDs. Do not make a syndicated copy canonical.
- The versioned archive is a product contract. Changes require an export/import compatibility test and a schema/version decision.
- New visibility, discovery, or syndication behavior must be opt-in. Never broaden the visibility of existing content by default.
- Before committing, run `npm run lint`, `npm run test`, `npm run typecheck`, and `npm run build`.

## Initial scope

The initial vertical slice supports managed local demo identity, one writer, Notes and Articles, canonical path generation, and a versioned local archive export. It intentionally excludes server-rendered public pages, RSS, authentication, remote storage, custom domains, social graph, private content, federation, email delivery, payments, and multi-host migration.

## Commit conventions

Use conventional commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `chore:`. Keep commits narrow and never commit generated secrets or local databases.
