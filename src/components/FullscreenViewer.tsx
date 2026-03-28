import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import { KombiConfig } from '../types';
import { Maximize2, Minimize2, RotateCcw, Eye, EyeOff } from 'lucide-react';

// Importa o modelo diretamente (reusa KombiViewer3D internamente)
import { KombiViewer3D } from './KombiViewer3D';

interface Props {
  config: KombiConfig;
  setConfig: (c: KombiConfig) => void;
}

export const Tela CheiaViewer: React.FC<Props> = ({ config, setConfig }) => {
  const [isTela Cheia, setIsTela Cheia] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTela Cheia = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestTela Cheia?.().then(() => setIsTela Cheia(true)).catch(() => {});
    } else {
      document.exitTela Cheia?.().then(() => setIsTela Cheia(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setIsTela Cheia(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${isTela Cheia ? 'bg-[#050505]' : ''}`}>
      {/* Viewer */}
      <KombiViewer3D config={config} />

      {/* Tela Cheia controls overlay */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {/* Toggle interior */}
        <button
          onClick={() => setConfig({ ...config, showInterior: !config.showInterior })}
          className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
        >
          {config.showInterior ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          Interior
        </button>

        {/* Tela Cheia */}
        <button
          onClick={toggleTela Cheia}
          className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
        >
          {isTela Cheia ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          {isTela Cheia ? 'Sair' : 'Tela Cheia'}
        </button>
      </div>

      {/* Tela Cheia hint */}
      {isTela Cheia && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono text-white/50 uppercase tracking-widest">
            Arraste para orbitar · Scroll para zoom · ESC para sair
          </div>
        </div>
      )}
    </div>
  );
};
