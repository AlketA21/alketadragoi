'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, useGLTF, OrbitControls } from '@react-three/drei'
import { Component, Suspense, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

const GOLD = '#d9c48f'
const CYAN = '#22d3ee'

// ─── Ngarko modelin GLB ──────────────────────────────────────────────────────
function GLBModel() {
  const { scene } = useGLTF('/model.glb')
  const ref = useRef<THREE.Group>(null)

  // Klono skenën që mund të ripërdoret
  const cloned = useMemo(() => scene.clone(), [scene])

  // Animacion lundrimi i butë
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 1.2) * 0.06
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.08
  })

  return (
    <primitive
      ref={ref}
      object={cloned}
      scale={1}          // ← ndrysho këtë nëse karakteri del shumë i madh/vogël
      position={[0, 0, 0]}
    />
  )
}

// ─── Kristale lundruese në sfond ─────────────────────────────────────────────
function CrystalShards() {
  const shards = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        -4 - Math.random() * 6,
      ] as [number, number, number],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.12 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.6,
      drift: Math.random() * Math.PI * 2,
      color: [GOLD, CYAN, '#a78bfa', '#f9a8d4'][Math.floor(Math.random() * 4)],
    }))
  , [])

  const refs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.current.forEach((m, i) => {
      if (!m) return
      const s = shards[i]
      m.rotation.x = s.rot[0] + t * s.speed * 0.3
      m.rotation.y = s.rot[1] + t * s.speed * 0.5
      m.position.y = s.pos[1] + Math.sin(t * 0.4 + s.drift) * 0.8
      m.position.x = s.pos[0] + Math.cos(t * 0.3 + s.drift) * 0.5
    })
  })

  return (
    <group>
      {shards.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) refs.current[i] = el }}
          position={s.pos}
          rotation={s.rot}
          scale={s.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={s.color}
            roughness={0.05}
            metalness={0.8}
            transparent
            opacity={0.55}
            emissive={s.color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Orbita/unaza holografike ────────────────────────────────────────────────
function HoloDisc() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.55
    if (ring2.current) ring2.current.rotation.z -= delta * 0.38
  })

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ring1}>
        <ringGeometry args={[1.48, 1.6, 80]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[1.18, 1.25, 80]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Ndriçimi ────────────────────────────────────────────────────────────────
function Rig() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} castShadow />
      <pointLight position={[-3.5, 3.5, -2]} intensity={32} color="#a855f7" distance={16} />
      <pointLight position={[3.5, 3, -1.5]} intensity={30} color={GOLD} distance={16} />
      <pointLight position={[0, 2, 5]} intensity={8} color={CYAN} distance={12} />
      <spotLight position={[0, 7, 5]} angle={0.48} penumbra={0.85} intensity={1.4} castShadow />
    </>
  )
}

// ─── Loading fallback ────────────────────────────────────────────────────────
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} wireframe />
    </mesh>
  )
}

// ─── Error boundary: if 3D fails (old device, no WebGL, blocked file) the rest
// of the page keeps working instead of showing "This page couldn't load".
class SafeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// ─── Canvas kryesor ──────────────────────────────────────────────────────────
export function Character3D() {
  return (
    <SafeBoundary>
      <Scene3D />
    </SafeBoundary>
  )
}

function Scene3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<Loader />}>
        <Rig />
        <CrystalShards />

        <group position={[0, -1.2, 0]}>
          <GLBModel />
          <HoloDisc />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={5}
            blur={2.6}
            far={3}
            color="#1a1a2e"
          />
        </group>

        {/* Procedural studio lighting — no external HDR download (the old
            "city" preset fetched a file from a third-party CDN, which can
            fail on slow/blocked networks and crash the whole page). */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} position={[0, 5, -6]} scale={[12, 4, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} color="#fff4d6" />
          <Lightformer form="rect" intensity={1.6} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} color="#dfe9ff" />
          <Lightformer form="ring" intensity={1.2} position={[0, 2, 6]} scale={4} />
        </Environment>
        {/* Hiq komentin poshtë nëse do të rrotullosh modelin me mouse */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  )
}

// Preload GLB
useGLTF.preload('/model.glb')
