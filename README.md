# Freehold App

> **Freehold is the internet without landlords.**

This is the public reference application for Freehold. It begins with independent writers: publish canonical work, own the archive, and expand into the wider Freehold ecosystem transparently rather than through a later product pivot.

## Current stage

This repository is establishing a local Alpha vertical slice. It is **not yet a hosted service** and must not be used for real private content or as a production archive.

See:

- [`docs/product/alpha-charter.md`](docs/product/alpha-charter.md) — the user compact and scope boundary
- [`docs/plans/2026-07-26-alpha-foundation.md`](docs/plans/2026-07-26-alpha-foundation.md) — the implementation plan
- [`CLAUDE.md`](CLAUDE.md) — contributor and agent rules

## Local development

```bash
# Requires Node 22.22.3 (see .nvmrc)
npm install
npm run dev
```

Before opening a pull request or pushing a release candidate:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Security and privacy

Do not commit tokens, exports, user content, mailing-list data, or `.env`
files. This repository uses synthetic data only until the hosted Alpha has
real authentication, storage, encryption, backups, and privacy review.

## License

License selection is deliberately deferred until the application and its
contributor/governance model are ready for a public commitment.
