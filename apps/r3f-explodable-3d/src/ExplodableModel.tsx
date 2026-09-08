import { useMemo, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { PARTS, lerpPartPosition, type PartDef } from './parts'

type Props = {
  explode: number
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  showLabels: boolean
}

function PartMesh({
  part,
  explode,
  selected,
  hovered,
  onSelect,
  onHover,
  showLabel,
}: {
  part: PartDef
  explode: number
  selected: boolean
  hovered: boolean
  onSelect: () => void
  onHover: (v: boolean) => void
  showLabel: boolean
}) {
  const group = useRef<Group>(null)
  const target = useMemo(
    () => lerpPartPosition(part, explode),
    [part, explode],
  )

  useFrame((_, dt) => {
    if (!group.current) return
    const g = group.current
    const k = 1 - Math.exp(-10 * dt)
    g.position.x += (target[0] - g.position.x) * k
    g.position.y += (target[1] - g.position.y) * k
    g.position.z += (target[2] - g.position.z) * k
  })

  const emissive = selected || hovered ? '#fbbf24' : '#000000'
  const emissiveIntensity = selected ? 0.45 : hovered ? 0.25 : 0
  const outlineScale = selected || hovered ? 1.02 : 1

  return (
    <group
      ref={group}
      position={part.assembled}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <group scale={outlineScale}>{renderPartGeometry(part, emissive, emissiveIntensity)}</group>
      {showLabel && explode > 0.15 && (
        <Html
          position={[0, 0.55, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className={`part-label${selected || hovered ? ' part-label--active' : ''}`}
          >
            {part.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function renderPartGeometry(
  part: PartDef,
  emissive: string,
  emissiveIntensity: number,
) {
  const mat = (
    <meshStandardMaterial
      color={part.color}
      metalness={0.55}
      roughness={0.35}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
    />
  )

  switch (part.id) {
    case 'block':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.0, 0.9]} />
          {mat}
        </mesh>
      )
    case 'crank':
      return (
        <group>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
            {mat}
          </mesh>
          {[-0.45, -0.15, 0.15, 0.45].map((x) => (
            <mesh key={x} castShadow position={[x, -0.12, 0]}>
              <boxGeometry args={[0.18, 0.28, 0.18]} />
              {mat}
            </mesh>
          ))}
        </group>
      )
    case 'pistons':
      return (
        <group>
          {[-0.45, -0.15, 0.15, 0.45].map((x) => (
            <mesh key={x} castShadow position={[x, 0, 0]}>
              <cylinderGeometry args={[0.14, 0.14, 0.35, 20]} />
              {mat}
            </mesh>
          ))}
        </group>
      )
    case 'head':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.65, 0.35, 0.95]} />
          {mat}
        </mesh>
      )
    case 'intake':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.25, 0.35]} />
            {mat}
          </mesh>
          {[-0.35, -0.12, 0.12, 0.35].map((x) => (
            <mesh key={x} castShadow position={[x, -0.2, -0.15]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
              {mat}
            </mesh>
          ))}
        </group>
      )
    case 'exhaust':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.2, 0.28]} />
            {mat}
          </mesh>
          {[-0.35, -0.12, 0.12, 0.35].map((x) => (
            <mesh key={x} castShadow position={[x, 0.05, 0.2]} rotation={[-0.5, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
              {mat}
            </mesh>
          ))}
        </group>
      )
    case 'turbo':
      return (
        <group>
          <mesh castShadow>
            <torusGeometry args={[0.22, 0.1, 12, 24]} />
            {mat}
          </mesh>
          <mesh castShadow position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
            <meshStandardMaterial
              color={part.accent ?? '#ef4444'}
              metalness={0.4}
              roughness={0.4}
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
        </group>
      )
    case 'oilpan':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.35, 0.8]} />
          {mat}
        </mesh>
      )
    default:
      return (
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          {mat}
        </mesh>
      )
  }
}

export function ExplodableModel({
  explode,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  showLabels,
}: Props) {
  return (
    <group>
      {PARTS.map((part) => (
        <PartMesh
          key={part.id}
          part={part}
          explode={explode}
          selected={selectedId === part.id}
          hovered={hoveredId === part.id}
          onSelect={() => onSelect(part.id)}
          onHover={(v) => onHover(v ? part.id : null)}
          showLabel={showLabels}
        />
      ))}
    </group>
  )
}

