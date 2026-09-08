import type { Vector3Tuple } from 'three'

export type PartDef = {
  id: string
  name: string
  description: string
  /** Assembled local position */
  assembled: Vector3Tuple
  /** Direction to push when exploded (unit-ish); scaled by explode distance */
  explodeDir: Vector3Tuple
  explodeDistance: number
  color: string
  accent?: string
}

/** Stylized inline-4 engine block assembly (procedural meshes). */
export const PARTS: PartDef[] = [
  {
    id: 'block',
    name: 'Engine Block',
    description: 'Main cast housing for cylinders and coolant passages.',
    assembled: [0, 0, 0],
    explodeDir: [0, -1, 0],
    explodeDistance: 1.2,
    color: '#3d4f5f',
  },
  {
    id: 'crank',
    name: 'Crankshaft',
    description: 'Converts reciprocating piston motion into rotation.',
    assembled: [0, -0.55, 0],
    explodeDir: [0, -1, 0.15],
    explodeDistance: 2.0,
    color: '#c4a35a',
  },
  {
    id: 'pistons',
    name: 'Pistons',
    description: 'Four pistons that compress the air–fuel charge.',
    assembled: [0, 0.35, 0],
    explodeDir: [0, 1, 0],
    explodeDistance: 1.6,
    color: '#8a9aa8',
  },
  {
    id: 'head',
    name: 'Cylinder Head',
    description: 'Seals combustion chambers; holds valves and cams.',
    assembled: [0, 0.85, 0],
    explodeDir: [0, 1, 0],
    explodeDistance: 2.2,
    color: '#2f3e4a',
  },
  {
    id: 'intake',
    name: 'Intake Manifold',
    description: 'Routes air into the cylinder head runners.',
    assembled: [0, 1.15, 0.55],
    explodeDir: [0, 0.4, 1],
    explodeDistance: 1.8,
    color: '#5b7c99',
  },
  {
    id: 'exhaust',
    name: 'Exhaust Manifold',
    description: 'Collects hot gases from the exhaust ports.',
    assembled: [0, 0.75, -0.55],
    explodeDir: [0, 0.2, -1],
    explodeDistance: 1.8,
    color: '#a65d3f',
  },
  {
    id: 'turbo',
    name: 'Turbocharger',
    description: 'Uses exhaust energy to boost intake pressure.',
    assembled: [0.95, 0.35, -0.35],
    explodeDir: [1, 0.1, -0.3],
    explodeDistance: 2.0,
    color: '#6b7280',
    accent: '#ef4444',
  },
  {
    id: 'oilpan',
    name: 'Oil Pan',
    description: 'Reservoir for lubricating oil under the block.',
    assembled: [0, -0.95, 0],
    explodeDir: [0, -1, 0],
    explodeDistance: 1.4,
    color: '#1f2937',
  },
]

export function lerpPartPosition(
  part: PartDef,
  explode: number,
): Vector3Tuple {
  const t = Math.max(0, Math.min(1, explode))
  return [
    part.assembled[0] + part.explodeDir[0] * part.explodeDistance * t,
    part.assembled[1] + part.explodeDir[1] * part.explodeDistance * t,
    part.assembled[2] + part.explodeDir[2] * part.explodeDistance * t,
  ]
}
