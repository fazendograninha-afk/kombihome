import React from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { KombiConfig } from '../types';

interface Props { config: KombiConfig; }

export const KombiInterior: React.FC<Props> = ({ config }) => {
  const w = 1.5;

  return (
    <group position={[0, -0.55, 0]}>
      {/* === CAMA (rear) === */}
      <group position={[0, 0.12, -1.1]}>
        {/* Plataforma */}
        <mesh>
          <boxGeometry args={[w, 0.08, 1.0]} />
          <meshStandardMaterial color={config.bedColor} roughness={0.8} />
        </mesh>
        {/* Colchão */}
        <mesh position={[0, 0.07, 0]}>
          <RoundedBox args={[w - 0.1, 0.1, 0.9]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color="#e2c9a0" roughness={0.9} />
          </RoundedBox>
        </mesh>
        {/* Travesseiro */}
        <mesh position={[0, 0.14, 0.38]}>
          <RoundedBox args={[0.5, 0.08, 0.2]} radius={0.03} smoothness={4}>
            <meshStandardMaterial color="#f0ede8" roughness={0.95} />
          </RoundedBox>
        </mesh>
        {/* Pés da cama */}
        {([-w/2 + 0.06, w/2 - 0.06] as number[]).map((x, i) =>
          ([-0.45, 0.45] as number[]).map((z, j) => (
            <mesh key={`leg-${i}-${j}`} position={[x, -0.1, z]}>
              <boxGeometry args={[0.04, 0.2, 0.04]} />
              <meshStandardMaterial color={config.bedColor} metalness={0.3} roughness={0.6} />
            </mesh>
          ))
        )}
      </group>

      {/* === COZINHA (mid-right) === */}
      <group position={[w/2 - 0.18, 0.1, 0.1]}>
        {/* Bancada */}
        <mesh>
          <boxGeometry args={[0.32, 0.06, 0.7]} />
          <meshStandardMaterial color={config.kitchenColor} roughness={0.4} />
        </mesh>
        {/* Gabinete */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.32, 0.34, 0.7]} />
          <meshStandardMaterial color={config.kitchenColor} roughness={0.6} />
        </mesh>
        {/* Fogão (2 bocas) */}
        {([-0.07, 0.07] as number[]).map((z, i) => (
          <mesh key={i} position={[0, 0.04, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Pia */}
        <mesh position={[0, 0.04, -0.26]}>
          <boxGeometry args={[0.24, 0.03, 0.2]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Torneira */}
        <mesh position={[0, 0.1, -0.3]}>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* === BANQUETAS / ÁREA SOCIAL (front) === */}
      <group position={[0, 0, 0.95]}>
        {/* Banqueta esquerda */}
        <group position={[-0.45, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <RoundedBox args={[0.55, 0.08, 0.45]} radius={0.03} smoothness={4}>
              <meshStandardMaterial color={config.seatingColor} roughness={0.7} />
            </RoundedBox>
          </mesh>
          <mesh position={[0, 0.0, 0]}>
            <boxGeometry args={[0.55, 0.28, 0.45]} />
            <meshStandardMaterial color={config.seatingColor} roughness={0.8} />
          </mesh>
          {/* Encosto */}
          <mesh position={[-0.24, 0.35, 0]}>
            <boxGeometry args={[0.06, 0.35, 0.45]} />
            <meshStandardMaterial color={config.seatingColor} roughness={0.8} />
          </mesh>
        </group>

        {/* Banqueta direita */}
        <group position={[0.45, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <RoundedBox args={[0.55, 0.08, 0.45]} radius={0.03} smoothness={4}>
              <meshStandardMaterial color={config.seatingColor} roughness={0.7} />
            </RoundedBox>
          </mesh>
          <mesh position={[0, 0.0, 0]}>
            <boxGeometry args={[0.55, 0.28, 0.45]} />
            <meshStandardMaterial color={config.seatingColor} roughness={0.8} />
          </mesh>
          <mesh position={[0.24, 0.35, 0]}>
            <boxGeometry args={[0.06, 0.35, 0.45]} />
            <meshStandardMaterial color={config.seatingColor} roughness={0.8} />
          </mesh>
        </group>

        {/* Mesa central dobrável */}
        <mesh position={[0, 0.22, 0]}>
          <RoundedBox args={[0.5, 0.04, 0.4]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#8b7355" roughness={0.5} />
          </RoundedBox>
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.32, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* === PISO === */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[w, 0.03, 3.6]} />
        <meshStandardMaterial color="#2d2416" roughness={0.9} />
      </mesh>

      {/* === ARMÁRIO OVERHEAD (rear top) === */}
      <group position={[0, 0.55, -1.3]}>
        <mesh>
          <boxGeometry args={[w, 0.28, 0.35]} />
          <meshStandardMaterial color={config.kitchenColor} roughness={0.6} transparent opacity={0.85} />
        </mesh>
        {/* Puxador */}
        <mesh position={[0, -0.1, 0.185]}>
          <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};
