# Agent instructions (tech-demos monorepo)

You are working in RR's sticky tech-demos monorepo. Follow these rules strictly.

## Scope

- Only add/update files under `apps/<kebab-slug>/` for the assigned demo.
- You may also update `tracking/seen-bookmarks.json` when asked to record a proposed/built/skipped pick.
- Do **not** create a new GitHub repository.
- Do **not** touch other apps under `apps/`.

## App requirements

- Each app must be self-contained: from `apps/<slug>/`, `bun install && bun run dev` works.
- Before any `bun install` / `bun add` in a new app, ensure a `bunfig.toml` with:

```toml
[install]
minimumReleaseAge = 259200
```

- Prefer official scaffolds via `bunx create-*` (create-next-app, create-vite, create-t3-app, create-tanstack, create-expo, etc.).
- UI default: shadcn/ui with a minimalist preset; add components on demand.

## Planning

- Run the in-repo skill at `skills/project-planning/` first.
- Write `apps/<slug>/PLAN.md` before coding.

## PR / validation

- Open **one** PR for the demo.
- Attach **both** at least one screenshot **and** at least one video of the running app in the PR. Not optional.
