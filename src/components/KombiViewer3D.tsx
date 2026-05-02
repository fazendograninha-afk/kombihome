import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { KombiConfig } from '../types';
import { KombiInterior } from './KombiInterior';

interface ModelProps { config: KombiConfig; }

// ─── Modelo GLB real ────────────────────────────────────────────────────────
const KombiModel: React.FC<ModelProps> = ({ config }) => {
  const { scene } = useGLTF('/kombi.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Aplica cor superior do config em todos os meshes do modelo
  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      const applyColor = (mat: THREE.Material) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.color.set(config.upperColor);
          mat.opacity = config.showInterior ? 0.35 : 1.0;
          mat.transparent = config.showInterior;
          mat.needsUpdate = true;
        }
      };

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(applyColor);
      } else {
        applyColor(mesh.material);
      }
    });
  }, [scene, config.upperColor, config.showInterior]);

  // Flutuação suave
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.025;
    }
  });

  // Escala vertical sobe conforme elevação do teto
  const scaleY = 1 + (config.roofHeight - 0.3) * 0.25;

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={[2.2, 2.2 * scaleY, 2.2]}
        rotation={[0, Math.PI / 8, 0]}
        position={[0, 0, 0]}
      />
      {config.showInterior && (
        <KombiInterior config={config} />
      )}
    </group>
  );
};

// Pré-carrega o modelo assim que o módulo é importado
useGLTF.preload('/kombi.glb');

// ─── Loading fallback ────────────────────────────────────────────────────────
const LoadingKombi: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.8;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.8, 0]}>
      <boxGeometry args={[1.7, 1.6, 4.2]} />
      <meshStandardMaterial color="#1e3a6e" wireframe />
    </mesh>
  );
};

// ─── Export principal ────────────────────────────────────────────────────────
export const KombiViewer3D: React.FC<ModelProps> = ({ config }) => (
  <div className="w-full h-[600px] bg-[#050505] rounded-2xl overflow-hidden shadow-inner border border-white/5 relative">
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[6, 4, 6]} />
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.05}
      />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048] as any}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#e11d48" />
      <directionalLight position={[0, 8, -5]} intensity={0.8} color="#6699ff" />
      <Environment preset="city" />

      <Suspense fallback={<LoadingKombi />}>
        <KombiModel config={config} />
      </Suspense>

      <Grid
        infiniteGrid
        fadeDistance={30}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor="#3b82f6"
        cellColor="#1e293b"
        sectionThickness={1.5}
      />
      <fog attach="fog" args={['#050505', 10, 25]} />
    </Canvas>

    {/* Badge ao vivo */}
    <div className="absolute top-6 left-6 pointer-events-none">
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
          Simulação em Tempo Real
        </span>
      </div>
    </div>

    {/* Indicador de carregamento do GLB */}
    <div className="absolute bottom-4 right-4 pointer-events-none opacity-30">
      <span className="text-[9px] font-mono text-white/50 tracking-widest">
        GLB · kombi.glb
      </span>
    </div>
  </div>
);
