import React from 'react';
import { KombiConfig } from '../types';
import { ShieldAlert, Wind, Weight, Ruler, Layers } from 'lucide-react';

interface Props { config: KombiConfig; }

export const EngineeringPanel: React.FC<Props> = ({ config }) => {
  const extraWeight = (config.roofHeight * 12) + (config.solarPanels * 12) + config.waterTankCapacity;
  const cgShift = (config.roofHeight * 0.12).toFixed(2);
  const dragIncrease = (config.roofHeight * 12).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel p-8 rounded-3xl border border-white/5">
        <h3 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.2em]">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Análise de Impacto Paramétrico
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <Weight className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Carga Estimada</span>
            </div>
            <span className="font-mono text-sm font-bold text-white">~{extraWeight.toFixed(0)} kg</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deslocamento Vertical do CG</span>
            </div>
            <span className="font-mono text-sm font-bold text-amber-500">+{cgShift} m</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <Wind className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Variação Coef. Arrasto Δ</span>
            </div>
            <span className="font-mono text-sm font-bold text-red-500">+{dragIncrease}%</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/5">
        <h3 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.2em]">
          <Ruler className="w-4 h-4 text-blue-500" />
          Diretrizes de Fabricação
        </h3>
        <ul className="space-y-4 text-xs text-slate-400 font-medium">
          {[
            ['Estrutura', 'Tubo de aço 20x20mm (parede 1.5mm) para a gaiola de elevação.'],
            ['Reforço', 'Solda de reforço no pilar B e travessa traseira do motor.'],
            ['Vedação', 'Selante PU40 automotivo em todas as interfaces fibra/aço.'],
            ['Isolamento', '3TC ou Rockwool (50mm) para otimização térmica e acústica.'],
            ['Montagem A/C', 'Base de chapa 2mm para atenuar ressonância no teto.'],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span><strong className="text-slate-200">{k}:</strong> {v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
