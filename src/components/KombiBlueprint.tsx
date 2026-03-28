import React from 'react';
import { KombiConfig } from '../types';

interface Props { config: KombiConfig; }

export const KombiBlueprint: React.FC<Props> = ({ config }) => {
  const scale = 80;
  const width = 1.7 * scale;
  const length = 4.4 * scale;
  const height = 1.6 * scale;
  const elevatedHeight = config.roofHeight * scale;
  const elevatedLength = config.roofLength * scale;
  const bPillarPos = 1.2 * scale;

  const tankWidth = 0.4 * scale;
  const tankLength = 0.8 * scale;
  const tankHeight = 0.3 * (config.waterTankCapacity / 100) * scale;
  const tankX = 50 + (2.2 - 0.4) * scale;
  const tankY_Top = 50 + (0.85 - 0.55) * scale;
  const tankY_Side = elevatedHeight + 50 + height - 0.55 * scale;

  return (
    <div className="w-full bg-[#0a192f] p-8 rounded-xl border-2 border-blue-900/50 shadow-2xl font-mono text-xs overflow-x-auto">
      <h3 className="text-blue-400 uppercase tracking-widest mb-6 font-bold border-b border-blue-900/50 pb-2 flex justify-between items-center">
        <span>KombiHome Creator por MaicknucleaR</span>
        <span className="text-[10px] text-blue-600">Planta Técnica v2.5 // Modo Escuro</span>
      </h3>

      <div className="flex flex-col gap-12 min-w-[600px]">
        <div className="relative">
          <span className="absolute -top-4 left-0 text-blue-400/70 font-bold uppercase tracking-widest text-[10px]">Vista Lateral (Escala 1:50)</span>
          <svg width={length + 150} height={height + elevatedHeight + 100} viewBox={`0 0 ${length + 150} ${height + elevatedHeight + 100}`}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1={height + elevatedHeight + 50} x2={length + 150} y2={height + elevatedHeight + 50} stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
            <rect x="50" y={elevatedHeight + 50} width={length} height={height} fill="url(#bodyGradient)" stroke="#3b82f6" strokeWidth="1.5" rx="15" />
            <line x1="50" y1={elevatedHeight + 50 + height / 2} x2={50 + length} y2={elevatedHeight + 50 + height / 2} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" />

            <rect x={50 + 80} y={elevatedHeight + 50 + 15} width="50" height="35" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
            <rect x={50 + 145} y={elevatedHeight + 50 + 15} width="50" height="35" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
            <rect x={50 + 210} y={elevatedHeight + 50 + 15} width="50" height="35" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />

            <rect x={50 + length - bPillarPos - 40 - elevatedLength} y={50} width={elevatedLength} height={elevatedHeight} fill="#1e293b" stroke="#60a5fa" strokeWidth="2" rx="5" />
            <rect x={50 + length - bPillarPos - 40 - elevatedLength + (config.acPosition * elevatedLength) - 22.5} y={50 - 15} width="45" height="15" fill="#334155" stroke="#60a5fa" strokeWidth="1" rx="2" />

            <g transform={`translate(${50 + 80}, ${elevatedHeight + 50 + height})`}>
              <circle r="25" fill="#020617" stroke="#3b82f6" strokeWidth="2" />
              <circle r="15" fill="#1e293b" stroke="#3b82f6" />
              <circle r="5" fill="#3b82f6" />
            </g>
            <g transform={`translate(${50 + length - 100}, ${elevatedHeight + 50 + height})`}>
              <circle r="25" fill="#020617" stroke="#3b82f6" strokeWidth="2" />
              <circle r="15" fill="#1e293b" stroke="#3b82f6" />
              <circle r="5" fill="#3b82f6" />
            </g>

            <rect x={tankX - tankLength / 2} y={tankY_Side - tankHeight / 2} width={tankLength} height={tankHeight} fill="#3b82f6" opacity="0.4" stroke="#60a5fa" strokeWidth="1" rx="4" />
            <text x={tankX} y={tankY_Side + tankHeight / 2 + 12} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">TANQUE {config.waterTankCapacity}L</text>

            <line x1={50 + length - bPillarPos - 40 - elevatedLength} y1="40" x2={50 + length - bPillarPos - 40} y2="40" stroke="#60a5fa" strokeWidth="1" />
            <text x={50 + length - bPillarPos - 40 - elevatedLength / 2} y="35" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">{config.roofLength}m</text>
          </svg>
        </div>

        <div className="relative">
          <span className="absolute -top-4 left-0 text-blue-400/70 font-bold uppercase tracking-widest text-[10px]">Vista Superior</span>
          <svg width={length + 150} height={width + 100} viewBox={`0 0 ${length + 150} ${width + 100}`}>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect x="50" y="50" width={length} height={width} fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="15" />
            <rect x={50 + 40} y={55} width={elevatedLength} height={width - 10} fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" rx="10" />
            {Array.from({ length: config.solarPanels }).map((_, i) => (
              <rect key={i} x={50 + 60 + (i * 50)} y={65} width="40" height={width - 30} fill="#0f172a" stroke="#3b82f6" strokeWidth="1" rx="2" />
            ))}
            <rect x={tankX - tankLength / 2} y={tankY_Top - tankWidth / 2} width={tankLength} height={tankWidth} fill="#3b82f6" opacity="0.4" stroke="#60a5fa" strokeWidth="1" rx="4" />
          </svg>
        </div>
      </div>
    </div>
  );
};
