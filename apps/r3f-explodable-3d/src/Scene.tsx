import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ExplodableModel } from './ExplodableModel'

type Props = {
  explode: number
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  showLabels: boolean
}

export function Scene({
  explode,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  showLabels,
}: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [3.2, 2.4, 4.2], fov: 42 }}
      dpr={[1, 1.75]}
      style={{ width: '100%', height: '100%' }}
      onPointerMissed={() => onSelect('')}
    >
      <color attach="background" args={['#0b1220']} />
      <fog attach="fog" args={['#0b1220', 8, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[5, 8, 4]}
        intensity={1.35}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} />
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <ExplodableModel
          explode={explode}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
          showLabels={showLabels}
        />
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.55}
          scale={12}
          blur={2.5}
          far={4}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={12}
        target={[0, 0.2, 0]}
      />
    </Canvas>
  )
}
