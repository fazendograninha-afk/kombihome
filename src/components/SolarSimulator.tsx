import React, { useState, useEffect } from 'react';
import { KombiConfig } from '../types';
import { Sun, MapPin, Zap, Battery, TrendingUp } from 'lucide-react';

interface Props { config: KombiConfig; }

// Irradiância média diária (kWh/m²/dia) por região brasileira
const REGIONS: Record<string, { label: string; irradiance: number; flag: string }> = {
  nordeste:   { label: 'Nordeste (BA/CE/PE)',  irradiance: 6.0, flag: '🌞' },
  centroeste: { label: 'Centro-Oeste (GO/MT)', irradiance: 5.5, flag: '☀️' },
  sudeste:    { label: 'Sudeste (SP/RJ/MG)',   irradiance: 4.8, flag: '🌤️' },
  sul:        { label: 'Sul (PR/SC/RS)',        irradiance: 4.2, flag: '⛅' },
  norte:      { label: 'Norte (AM/PA)',         irradiance: 4.5, flag: '🌦️' },
};

// Painel solar típico para camper: 100W, eficiência 20%
const PANEL_WATT_PEAK = 100;
const PANEL_AREA_M2 = 0.5; // m²
const SYSTEM_EFFICIENCY = 0.80; // perdas de inversor/cabos

// Consumo típico de camper (Wh/dia)
const APPLIANCES = [
  { name: 'Iluminação LED',    wh: 60  },
  { name: 'USB / Celulares',   wh: 40  },
  { name: 'Ventilador 12V',    wh: 120 },
  { name: 'Geladeira 12V',     wh: 350 },
  { name: 'Bomba d\'água',     wh: 30  },
];

export const SolarSimulator: React.FC<Props> = ({ config }) => {
  const [region, setRegion] = useState('sudeste');
  const [selectedAppliances, setSelectedAppliances] = useState<Set<number>>(new Set([0, 1, 2]));

  const reg = REGIONS[region];
  const panelCount = config.solarPanels;
  const totalArea = panelCount * PANEL_AREA_M2;

  // Geração diária
  const generationWh = totalArea * reg.irradiance * 1000 * (PANEL_WATT_PEAK / (PANEL_AREA_M2 * 1000)) * SYSTEM_EFFICIENCY;
  const generationKwh = generationWh / 1000;

  // Consumo selecionado
  const consumeWh = [...selectedAppliances].reduce((acc, i) => acc + APPLIANCES[i].wh, 0);
  const balance = generationWh - consumeWh;
  const autonomyDays = consumeWh > 0 ? (generationWh / consumeWh).toFixed(1) : '∞';
  const batteryNeeded = Math.ceil(consumeWh * 2 / 12); // 2 dias autonomia, 12V

  const toggleAppliance = (i: number) => {
    setSelectedAppliances(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const barWidth = Math.min((generationWh / Math.max(consumeWh, 1)) * 100, 100);

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">
      <h3 className="text-sm font-black flex items-center gap-3 text-white uppercase tracking-[0.2em]">
        <Sun className="w-4 h-4 text-yellow-400" />
        Simulação Solar — {panelCount}x {PANEL_WATT_PEAK}W Panel{panelCount > 1 ? 's' : ''}
      </h3>

      {/* Região */}
      <div>
        <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
          <MapPin className="w-3 h-3 text-blue-500/50" /> Região de Operação
        </label>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(REGIONS).map(([key, val]) => (
            <button key={key} onClick={() => setRegion(key)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                region === key
                  ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
              }`}>
              <span>{val.flag} {val.label}</span>
              <span className="font-mono text-[10px]">{val.irradiance} kWh/m²/dia</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resultados principais */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 text-center">
          <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-black text-yellow-300 font-mono">{generationKwh.toFixed(2)}</div>
          <div className="text-[9px] uppercase tracking-widest text-yellow-500/70 mt-1">kWh / dia gerado</div>
        </div>
        <div className={`border rounded-2xl p-5 text-center ${balance >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
          <Battery className={`w-5 h-5 mx-auto mb-2 ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`} />
          <div className={`text-2xl font-black font-mono ${balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {balance >= 0 ? '+' : ''}{(balance / 1000).toFixed(2)}
          </div>
          <div className={`text-[9px] uppercase tracking-widest mt-1 ${balance >= 0 ? 'text-green-500/70' : 'text-red-500/70'}`}>
            kWh balanço
          </div>
        </div>
      </div>

      {/* Barra de geração vs consumo */}
      <div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-2">
          <span>CONSUMO {(consumeWh/1000).toFixed(2)} kWh</span>
          <span>GERAÇÃO {generationKwh.toFixed(2)} kWh</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${balance >= 0 ? 'bg-gradient-to-r from-yellow-500 to-green-500' : 'bg-gradient-to-r from-yellow-500 to-red-500'}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Aparelhos */}
      <div>
        <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-3 tracking-widest">
          <TrendingUp className="w-3 h-3 text-blue-500/50" /> Consumidores Ativos
        </label>
        <div className="space-y-2">
          {APPLIANCES.map((a, i) => (
            <button key={i} onClick={() => toggleAppliance(i)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedAppliances.has(i)
                  ? 'bg-blue-600/20 border-blue-500/30 text-blue-200'
                  : 'bg-white/3 border-white/5 text-slate-600'
              }`}>
              <span>{a.name}</span>
              <span className="font-mono text-[10px]">{a.wh} Wh/dia</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info extra */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        <div className="text-center">
          <div className="text-xl font-black font-mono text-white">{autonomyDays}x</div>
          <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">autonomia relativa</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black font-mono text-white">{batteryNeeded}Ah</div>
          <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">bateria recomendada</div>
        </div>
      </div>
    </div>
  );
};
