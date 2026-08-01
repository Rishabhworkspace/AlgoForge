import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

type Point = [number, number, number];

interface AlgorithmNode {
  id: string;
  name: string;
  complexity: string;
  space: string;
  position: Point;
  color: string;
  connectedTo: number[];
}

const ALGORITHM_NODES: AlgorithmNode[] = [
  { id: 'dp', name: 'Dynamic Programming', complexity: 'O(N * W)', space: 'O(N)', position: [-2.2, 0.9, 0.4], color: '#ffae62', connectedTo: [1, 2] },
  { id: 'graph', name: 'Graph Traversal (BFS)', complexity: 'O(V + E)', space: 'O(V)', position: [-1.1, -1.2, 0.6], color: '#00f0ff', connectedTo: [2, 3] },
  { id: 'core', name: 'Quantum Core Matrix', complexity: 'O(log N)', space: 'O(1)', position: [0, 0, 0], color: '#fa6a20', connectedTo: [3, 4] },
  { id: 'tree', name: 'Binary Search Tree', complexity: 'O(h)', space: 'O(1)', position: [1.4, 1.1, -0.3], color: '#a088ff', connectedTo: [4] },
  { id: 'window', name: 'Sliding Window', complexity: 'O(N)', space: 'O(k)', position: [2.3, -0.7, 0.5], color: '#ff8a63', connectedTo: [] },
];

function SignalPulse({ start, end, color, speed = 0.4, reduceMotion }: { start: Point; end: Point; color: string; speed?: number; reduceMotion: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const progress = reduceMotion ? 0.5 : (clock.getElapsedTime() * speed) % 1;
    const x = start[0] + (end[0] - start[0]) * progress;
    const y = start[1] + (end[1] - start[1]) * progress;
    const z = start[2] + (end[2] - start[2]) * progress;
    pulse.current.position.set(x, y, z);
    const scale = Math.sin(progress * Math.PI) * 1.3 + 0.4;
    pulse.current.scale.setScalar(scale);
  });
  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function OrbitingParticles({ count = 120, reduceMotion }: { count?: number; reduceMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorObj = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.4 + Math.random() * 1.6;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const palette = ['#fa6a20', '#00f0ff', '#a088ff', '#ffffff'];
      colorObj.set(palette[i % palette.length]);
      col[i * 3] = colorObj.r;
      col[i * 3 + 1] = colorObj.g;
      col[i * 3 + 2] = colorObj.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (!reduceMotion && pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function QuantumCore({ reduceMotion, activeNodeIndex }: { reduceMotion: boolean; activeNodeIndex: number }) {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!reduceMotion && coreRef.current) {
      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.rotation.z += delta * 0.12;
    }
    if (!reduceMotion && innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.45;
      innerRef.current.rotation.y -= delta * 0.35;
    }
  });

  const activeColor = ALGORITHM_NODES[activeNodeIndex]?.color || '#fa6a20';

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Outer Refractive Crystal Shell */}
      <mesh>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.88}
          roughness={0.12}
          thickness={1.6}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.45}
          reflectivity={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe Energy Cage */}
      <mesh>
        <dodecahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial color={activeColor} wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      {/* Orbiting Halo Torus */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.5, 0.012, 16, 100]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.85, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function AlgorithmScene({
  reduceMotion,
  activeNodeIndex,
  onSelectNode,
}: {
  reduceMotion: boolean;
  activeNodeIndex: number;
  onSelectNode: (index: number) => void;
}) {
  const sceneGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!reduceMotion && sceneGroup.current) {
      sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroup.current.rotation.y,
        (state.pointer.x * Math.PI) / 10,
        delta * 3
      );
      sceneGroup.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroup.current.rotation.x,
        (-state.pointer.y * Math.PI) / 14,
        delta * 3
      );
    }
  });

  return (
    <group ref={sceneGroup}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.0} color="#00f0ff" />
      <pointLight position={[0, 5, 5]} intensity={1.2} color="#ffae62" />

      <Float speed={reduceMotion ? 0 : 1.8} rotationIntensity={reduceMotion ? 0 : 0.4} floatIntensity={reduceMotion ? 0 : 0.6}>
        <QuantumCore reduceMotion={reduceMotion} activeNodeIndex={activeNodeIndex} />
      </Float>

      <OrbitingParticles count={110} reduceMotion={reduceMotion} />

      {/* Connecting Path Lines & Signal Pulses */}
      {ALGORITHM_NODES.map((node, i) =>
        node.connectedTo.map((targetIndex) => {
          const targetNode = ALGORITHM_NODES[targetIndex];
          if (!targetNode) return null;
          const isActiveEdge = i === activeNodeIndex || targetIndex === activeNodeIndex;
          return (
            <group key={`edge-${i}-${targetIndex}`}>
              <Line
                points={[node.position, targetNode.position]}
                color={isActiveEdge ? node.color : 'rgba(255, 255, 255, 0.15)'}
                lineWidth={isActiveEdge ? 2.5 : 1}
                transparent
                opacity={isActiveEdge ? 0.85 : 0.3}
              />
              <SignalPulse
                start={node.position}
                end={targetNode.position}
                color={node.color}
                speed={isActiveEdge ? 0.6 : 0.25}
                reduceMotion={reduceMotion}
              />
            </group>
          );
        })
      )}

      {/* Interactive Node Spheres */}
      {ALGORITHM_NODES.map((node, index) => {
        const isSelected = index === activeNodeIndex;
        return (
          <Float
            key={node.id}
            speed={reduceMotion ? 0 : 2}
            rotationIntensity={reduceMotion ? 0 : 0.5}
            floatIntensity={reduceMotion ? 0 : 0.5}
          >
            <group
              position={node.position}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(index);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              {/* Node Core Sphere */}
              <mesh scale={isSelected ? 1.35 : 1}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : 0.2}
                  roughness={0.2}
                />
              </mesh>
              {/* Outer Energy Glow Ring */}
              {isSelected && (
                <mesh>
                  <sphereGeometry args={[0.34, 32, 32]} />
                  <meshBasicMaterial color={node.color} transparent opacity={0.25} wireframe />
                </mesh>
              )}
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function StaticFallback() {
  return (
    <svg className="algorithm-workbench__fallback" viewBox="0 0 620 440" aria-hidden="true">
      <defs>
        <radialGradient id="quantum-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fa6a20" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="310" cy="220" r="150" fill="url(#quantum-glow)" />
      <polygon
        points="310,120 400,180 400,280 310,340 220,280 220,180"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <circle cx="310" cy="220" r="55" fill="#fa6a20" fillOpacity="0.8" />
      <circle cx="310" cy="220" r="85" fill="none" stroke="#00f0ff" strokeOpacity="0.4" strokeDasharray="6 6" />
      {[
        [220, 180],
        [400, 180],
        [400, 280],
        [220, 280],
        [310, 120],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={12} fill="#ffffff" />
          <circle cx={cx} cy={cy} r={22} fill="none" stroke="#ffae62" strokeOpacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function AlgorithmWorkbench({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(2); // Start with Quantum Core Matrix active
  const activeNode = ALGORITHM_NODES[activeNodeIndex] || ALGORITHM_NODES[0];

  return (
    <div className="algorithm-workbench doppelrand-shell" aria-label="Interactive 3D Quantum Algorithm Workbench">
      <div className="algorithm-workbench__frame doppelrand-core">
        {/* Topline HUD Header */}
        <div className="algorithm-workbench__topline">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fa6a20] animate-pulse" />
            QUANTUM ATELIER // 3D TRACE ENGINE
          </span>
          <span className="text-[#ffae62] font-mono">
            {activeNode.id.toUpperCase()} [{activeNodeIndex + 1}/{ALGORITHM_NODES.length}]
          </span>
        </div>

        {reduceMotion ? (
          <StaticFallback />
        ) : (
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 5.8], fov: 44 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            <AlgorithmScene
              reduceMotion={reduceMotion}
              activeNodeIndex={activeNodeIndex}
              onSelectNode={(index) => setActiveNodeIndex(index)}
            />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={!reduceMotion} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 2.6} />
          </Canvas>
        )}

        {/* Dynamic Glass Telemetry Chips */}
        <div
          className="absolute z-10 top-24 left-6 sm:left-8 px-4 py-2.5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer hover:border-[#ffae62]/50"
          onClick={() => setActiveNodeIndex((activeNodeIndex + 1) % ALGORITHM_NODES.length)}
        >
          <div className="text-[0.68rem] text-white/50 tracking-wider uppercase mb-0.5 font-mono">Active Target</div>
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
            {activeNode.name}
          </div>
        </div>

        <div className="absolute z-10 top-24 right-6 sm:right-8 px-4 py-2.5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl text-right">
          <div className="text-[0.68rem] text-white/50 tracking-wider uppercase mb-0.5 font-mono">Time & Space</div>
          <div className="text-sm font-mono font-bold text-[#00f0ff]">
            {activeNode.complexity} <span className="text-white/40 font-normal">|</span> {activeNode.space}
          </div>
        </div>

        {/* Interactive Algorithm Selector Pills */}
        <div className="absolute z-10 bottom-14 left-6 right-6 flex flex-wrap justify-center gap-2 pointer-events-auto">
          {ALGORITHM_NODES.map((node, index) => {
            const isCurrent = index === activeNodeIndex;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeIndex(index)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  isCurrent
                    ? 'bg-white/15 border-[#ffae62] text-white shadow-[0_0_15px_rgba(250,106,32,0.3)] scale-105'
                    : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:border-white/25'
                }`}
              >
                {node.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Legend Footer */}
        <div className="algorithm-workbench__legend">
          <span>
            <i /> 3D raycast live trace
          </span>
          <span className="text-white/50">Click nodes or drag to inspect matrix</span>
        </div>
      </div>
    </div>
  );
}
