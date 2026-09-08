import { useCallback, useEffect, useRef, useState } from 'react'
import { Scene } from './Scene'
import { PARTS } from './parts'
import './App.css'

function useTween(target: number, speed = 3.5) {
  const [value, setValue] = useState(target)
  const valueRef = useRef(value)
  valueRef.current = value

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const cur = valueRef.current
      const next = cur + (target - cur) * (1 - Math.exp(-speed * dt))
      if (Math.abs(next - target) < 0.001) {
        setValue(target)
        valueRef.current = target
        return
      }
      setValue(next)
      valueRef.current = next
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, speed])

  return value
}

export default function App() {
  const [explodeTarget, setExplodeTarget] = useState(0)
  const explode = useTween(explodeTarget)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartExplode = useRef(0)

  const selected =
    PARTS.find((p) => p.id === selectedId) ??
    PARTS.find((p) => p.id === hoveredId) ??
    null

  const onSelect = useCallback((id: string) => {
    setSelectedId(id || null)
  }, [])

  const toggleExplode = () => {
    setExplodeTarget((v) => (v > 0.5 ? 0 : 1))
  }

  const reset = () => {
    setExplodeTarget(0)
    setSelectedId(null)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <header className="sidebar__header">
          <p className="eyebrow">R3F learning demo</p>
          <h1>Explodable Engine</h1>
          <p className="lede">
            A stylized inline-4 assembly. Explode to study labeled parts, or
            pick a part from the list to highlight it in the scene.
          </p>
        </header>

        <div className="controls">
          <button type="button" className="btn btn--primary" onClick={toggleExplode}>
            {explodeTarget > 0.5 ? 'Assemble' : 'Explode'}
          </button>
          <button type="button" className="btn" onClick={reset}>
            Reset
          </button>
        </div>

        <label className="slider">
          <span>Explode amount</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={explodeTarget}
            onChange={(e) => setExplodeTarget(Number(e.target.value))}
          />
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
          />
          <span>Show part labels</span>
        </label>

        <h2 className="list-title">Parts</h2>
        <ul className="parts-list">
          {PARTS.map((part) => {
            const active = selectedId === part.id
            const hovered = hoveredId === part.id
            return (
              <li key={part.id}>
                <button
                  type="button"
                  className={`part-item${active ? ' is-active' : ''}${hovered ? ' is-hovered' : ''}`}
                  onClick={() => setSelectedId(part.id)}
                  onMouseEnter={() => setHoveredId(part.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span
                    className="swatch"
                    style={{ background: part.color }}
                    aria-hidden
                  />
                  <span className="part-item__text">
                    <strong>{part.name}</strong>
                    <small>{part.description}</small>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {selected && (
          <div className="detail">
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
          </div>
        )}
      </aside>

      <main
        className="viewport"
        onPointerDown={(e) => {
          if (e.button !== 0 || e.shiftKey) return
          // Middle/right still for orbit; left+Alt drag explodes horizontally
          if (!e.altKey) return
          dragging.current = true
          dragStartX.current = e.clientX
          dragStartExplode.current = explodeTarget
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return
          const dx = e.clientX - dragStartX.current
          const next = Math.max(
            0,
            Math.min(1, dragStartExplode.current + dx / 280),
          )
          setExplodeTarget(next)
        }}
        onPointerUp={() => {
          dragging.current = false
        }}
        onPointerLeave={() => {
          dragging.current = false
        }}
      >
        <Scene
          explode={explode}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={setHoveredId}
          showLabels={showLabels}
        />
        <div className="hud">
          <span>Drag to orbit · Scroll to zoom · Alt+drag to explode</span>
          <span>Click a mesh or list item to select</span>
        </div>
      </main>
    </div>
  )
}
