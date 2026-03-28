import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { KombiConfig } from '../types';
import { KombiInterior } from './KombiInterior';

interface ModelProps { config: KombiConfig; }

const KombiModel: React.FC<ModelProps> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);

  const width = 1.7;
  const length = 4.2;
  const height = 1.6;
  const bodyRadius = 0.2;

  const bodyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        upperColor: { value: new THREE.Color(config.upperColor) },
        lowerColor: { value: new THREE.Color(config.lowerColor) },
        splitHeight: { value: 0.0 },
        opacity: { value: config.showInterior ? 0.3 : 1.0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 upperColor;
        uniform vec3 lowerColor;
        uniform float splitHeight;
        uniform float opacity;
        varying vec3 vPosition;
        void main() {
          vec3 color = vPosition.y > splitHeight ? upperColor : lowerColor;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: config.showInterior,
    });
  }, [config.upperColor, config.lowerColor, config.showInterior]);

  return (
    <group ref={groupRef}>
      <group position={[0, height / 2, 0]}>
        <RoundedBox args={[width, height, length]} radius={bodyRadius} smoothness={10} position={[0, 0, 0]}>
          <primitive object={bodyMaterial} attach="material" />
        </RoundedBox>

        <group position={[0, height * 0.25, 0]}>
          <mesh position={[0, 0, length / 2 - 0.01]} rotation={[0.05, 0, 0]}>
            <boxGeometry args={[width * 0.85, height * 0.25, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.1} />
          </mesh>
          {([-width / 2 + 0.01, width / 2 - 0.01] as number[]).map((x, side) => (
            <group key={side} position={[x, 0, 0]}>
              {[1.1, 0.3, -0.5, -1.3].map((z, i) => (
                <mesh key={i} position={[0, 0, z]}>
                  <boxGeometry args={[0.05, height * 0.25, 0.6]} />
                  <meshStandardMaterial color="#111" roughness={0.1} />
                </mesh>
              ))}
            </group>
          ))}
          <mesh position={[0, 0, -length / 2 + 0.01]}>
            <boxGeometry args={[width * 0.7, height * 0.2, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.1} />
          </mesh>
        </group>

        <group position={[0, height / 2, 0]}>
          <mesh position={[0, config.roofHeight / 2, -0.2]}>
            <RoundedBox args={[width * 0.8, config.roofHeight, config.roofLength]} radius={0.05} smoothness={4}>
              <meshStandardMaterial color={config.upperColor} roughness={0.3} />
            </RoundedBox>
          </mesh>

          <group position={[0, 0.05, 0]}>
            <mesh>
              <boxGeometry args={[width * 0.85, 0.02, length * 0.8]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
            {([-width * 0.4, width * 0.4] as number[]).map((x, i) => (
              <mesh key={i} position={[x, 0.05, 0]}>
                <boxGeometry args={[0.02, 0.1, length * 0.8]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>

          <group position={[0, config.roofHeight + 0.02, -0.2]}>
            {Array.from({ length: config.solarPanels }).map((_, i) => (
              <mesh key={i} position={[0, 0, (i - (config.solarPanels - 1) / 2) * 0.5]}>
                <boxGeometry args={[width * 0.6, 0.02, 0.4]} />
                <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.1} />
              </mesh>
            ))}
          </group>

          <mesh position={[0, config.roofHeight + 0.05, -0.2 + (config.acPosition - 0.5) * config.roofLength]}>
            <RoundedBox args={[0.5, 0.15, 0.4]} radius={0.02} smoothness={4}>
              <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
            </RoundedBox>
          </mesh>
        </group>

        <group position={[0, -height * 0.1, length / 2 + 0.01]}>
          <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
          </mesh>
          {([-0.55, 0.55] as number[]).map((x, i) => (
            <mesh key={i} position={[x, -0.05, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.15, 32]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.2} />
            </mesh>
          ))}
        </group>

        <mesh position={[0, -height * 0.4, length / 2 + 0.05]}>
          <boxGeometry args={[width * 0.95, 0.15, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -height * 0.4, -length / 2 - 0.05]}>
          <boxGeometry args={[width * 0.95, 0.15, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* INTERIOR */}
        {config.showInterior && <KombiInterior config={config} />}
      </group>

      {([
        { pos: [-0.75, 0.3, 1.2] as [number,number,number], flip: true },
        { pos: [0.75, 0.3, 1.2] as [number,number,number], flip: false },
        { pos: [-0.75, 0.3, -1.3] as [number,number,number], flip: true },
        { pos: [0.75, 0.3, -1.3] as [number,number,number], flip: false },
      ]).map((wheel, i) => (
        <group key={i} position={wheel.pos}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.25, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
          <mesh position={[wheel.flip ? -0.13 : 0.13, 0, 0]} rotation={[0, wheel.flip ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const KombiViewer3D: React.FC<ModelProps> = ({ config }) => (
  <div className="w-full h-[600px] bg-[#050505] rounded-2xl overflow-hidden shadow-inner border border-white/5 relative">
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[6, 4, 6]} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} enableDamping dampingFactor={0.05} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={[2048, 2048] as any} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#e11d48" />
      <Environment preset="city" />
      <KombiModel config={config} />
      <Grid infiniteGrid fadeDistance={30} fadeStrength={5} cellSize={1} sectionSize={5} sectionColor="#3b82f6" cellColor="#1e293b" sectionThickness={1.5} />
      <fog attach="fog" args={['#050505', 10, 25]} />
    </Canvas>
    <div className="absolute top-6 left-6 pointer-events-none">
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Real-time Simulation</span>
      </div>
    </div>
  </div>
);
