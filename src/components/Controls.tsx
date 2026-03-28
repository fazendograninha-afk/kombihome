import React from 'react';
import { KombiConfig } from '../types';
import { Settings, Maximize2, MoveHorizontal, Wind, Sun, Droplets, Layout, Palette } from 'lucide-react';

interface Props {
  config: KombiConfig;
  setConfig: (c: KombiConfig) => void;
}

export const Controls: React.FC<Props> = ({ config, setConfig }) => {
  const update = (key: keyof KombiConfig, val: KombiConfig[keyof KombiConfig]) => {
    setConfig({ ...config, [key]: val });
  };

  return (
    <div className="h-full">
      <h3 className="text-sm font-black mb-8 flex items-center gap-3 text-white uppercase tracking-[0.2em] border-b border-white/10 pb-4">
        <Settings className="w-4 h-4 text-blue-500" />
        Parâmetros de Design
      </h3>

      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
            <Maximize2 className="w-3 h-3 text-blue-500/50" /> Elevação do Teto (m)
          </label>
          <input type="range" min="0.2" max="0.8" step="0.05"
            value={config.roofHeight}
            onChange={(e) => update('roofHeight', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-2">
            <span>0.2m</span>
            <span className="font-bold text-blue-500">{config.roofHeight}m</span>
            <span>0.8m</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
            <MoveHorizontal className="w-3 h-3 text-blue-500/50" /> Comprimento da Elevação (m)
          </label>
          <input type="range" min="1.5" max="3.2" step="0.1"
            value={config.roofLength}
            onChange={(e) => update('roofLength', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-2">
            <span>1.5m</span>
            <span className="font-bold text-blue-500">{config.roofLength}m</span>
            <span>3.2m</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
            <Wind className="w-3 h-3 text-blue-500/50" /> Posição do Ar-Condicionado
          </label>
          <input type="range" min="0" max="1" step="0.01"
            value={config.acPosition}
            onChange={(e) => update('acPosition', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-2">
            <span>Traseira</span>
            <span className="font-bold text-blue-500">{(config.acPosition * 100).toFixed(0)}%</span>
            <span>Dianteira</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
            <Sun className="w-3 h-3 text-blue-500/50" /> Painéis Solares (Qtd)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button key={n} onClick={() => update('solarPanels', n)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all border ${
                  config.solarPanels === n
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                    : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
            <Droplets className="w-3 h-3 text-blue-500/50" /> Capacidade de Água (L)
          </label>
          <select value={config.waterTankCapacity}
            onChange={(e) => update('waterTankCapacity', parseInt(e.target.value))}
            className="w-full p-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none">
            <option value={40} className="bg-[#141417]">40L (Compacto)</option>
            <option value={60} className="bg-[#141417]">60L (Padrão)</option>
            <option value={80} className="bg-[#141417]">80L (Máximo)</option>
            <option value={100} className="bg-[#141417]">100L (Expedição)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-white/5">
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-4 tracking-widest">
            <Palette className="w-3 h-3 text-blue-500/50" /> Acabamento (Bicolor)
          </label>
          <div className="space-y-4">
            {[
              { label: 'Parte Superior', key: 'upperColor' as const },
              { label: 'Parte Inferior', key: 'lowerColor' as const },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase">{label}</span>
                <input type="color" value={config[key] as string}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-10 h-6 bg-transparent border-none cursor-pointer rounded overflow-hidden"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <label className="text-[10px] font-black text-slate-500 uppercase flex items-center justify-between gap-2 mb-4 tracking-widest">
            <span className="flex items-center gap-2">
              <Layout className="w-3 h-3 text-blue-500/50" /> Visualização Interior
            </span>
            <button onClick={() => update('showInterior', !config.showInterior)}
              className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${
                config.showInterior ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'
              }`}>
              {config.showInterior ? 'ON' : 'OFF'}
            </button>
          </label>

          {config.showInterior && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Cama', key: 'bedColor' as const },
                { label: 'Cozinha', key: 'kitchenColor' as const },
                { label: 'Banquetas', key: 'seatingColor' as const },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-2">
                  <label className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{label}</label>
                  <input type="color" value={config[key] as string}
                    onChange={(e) => update(key, e.target.value)}
                    className="w-full h-8 bg-transparent border-none cursor-pointer rounded overflow-hidden"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/5">
          <p className="text-[9px] text-slate-600 italic leading-relaxed font-medium uppercase tracking-wider">
            Nota: Integridade estrutural verificada para cargas laterais até 0.8g. CG elevado detectado.
          </p>
        </div>
      </div>
    </div>
  );
};
