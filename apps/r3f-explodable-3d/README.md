# r3f-explodable-3d

Self-contained Vite + React + TypeScript + React Three Fiber demo: a stylized inline-4 engine that **explodes** into labeled parts for learning.

## Run

```bash
cd apps/r3f-explodable-3d
bun install
bun run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
bun run build
bun run preview
```

## Controls

- **Explode / Assemble** — tween parts outward or back together
- **Reset** — assembled state + clear selection
- **Explode amount** slider — scrub between assembled and exploded
- Click a mesh or a sidebar part to highlight / select
- Orbit: drag · Zoom: scroll · **Alt+drag** (horizontal) also scrubs explode

## Stack

Bun · Vite · React · TypeScript · three · @react-three/fiber · @react-three/drei

No backend, no API keys.
