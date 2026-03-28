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

export const FullscreenViewer: React.FC<Props> = ({ config, setConfig }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${isFullscreen ? 'bg-[#050505]' : ''}`}>
      {/* Viewer */}
      <KombiViewer3D config={config} />

      {/* Fullscreen controls overlay */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {/* Toggle interior */}
        <button
          onClick={() => setConfig({ ...config, showInterior: !config.showInterior })}
          className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
        >
          {config.showInterior ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          Interior
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </button>
      </div>

      {/* Fullscreen hint */}
      {isFullscreen && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono text-white/50 uppercase tracking-widest">
            Drag para orbitar · Scroll para zoom · ESC para sair
          </div>
        </div>
      )}
    </div>
  );
};
