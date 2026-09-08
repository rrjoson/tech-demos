# PLAN — r3f-explodable-3d

## Goal
Ship a single-user explodable 3D learning UI: one object breaks into labeled parts on interaction, inspired by the bookmarked Astra anatomy demo.

## Single-user MVP
- One mechanical/anatomical-style object (procedural or simple GLTF) that **explodes** into labeled parts on click/drag
- Reset to assembled state
- Simple parts list (name + highlight on hover/select)
- Orbit controls, decent lighting, readable labels
- Self-contained under `apps/r3f-explodable-3d/`: `bun install && bun run dev`

## Explicit outs
- No real human anatomy dataset / medical accuracy
- No auth, accounts, or backend
- No multi-object catalog / asset browser
- No AR/VR
- No Cloudflare deploy in this PR (preview later)

## Outcome-oriented tasks
1. Scaffold Vite + React + TypeScript via `bunx create-vite` (skip initial install if possible), add root `bunfig.toml` with `minimumReleaseAge = 259200`, then `bun install`
2. Add `@react-three/fiber`, `@react-three/drei`, `three`; wire a full-viewport Canvas
3. Build an ExplodableModel (e.g. stylized engine / joint / simple assembly of meshes) with per-part positions for assembled vs exploded
4. Add interaction: click/drag to tween explode factor; Reset button; parts list sidebar that highlights the matching mesh
5. Polish: Environment/ContactShadows/Html labels via drei; readable typography in a minimal overlay (shadcn only if it stays light — prefer plain Tailwind or CSS for one screen)
6. Verify `bun run dev` works; capture **screenshot + short video** of explode/reset for the PR

## Stack (one-line rationale)
- **Bun** — monorepo default runtime/package manager
- **Vite + React + TS** — official scaffold, fastest for a one-screen WebGL toy (skip Next/TanStack)
- **React Three Fiber + drei + three** — standard React wrapper for Three.js; drei covers controls/labels/helpers
- **No backend** — static client demo, no API keys

## Deferred
- Real GLTF anatomy models and medical labeling
- Multi-model picker / URL deep-links
- Cloudflare Pages path deploy
- Automated Playwright visual tests (manual screenshot/video is the validation bar for this demo)
