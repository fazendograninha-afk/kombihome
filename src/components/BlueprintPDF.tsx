import React from 'react';
import { KombiConfig } from '../types';
import { FileDown, Loader2 } from 'lucide-react';

interface Props { config: KombiConfig; }

function buildBlueprintSVG(config: KombiConfig): string {
  const scale = 80;
  const W = 700;
  const H = 900;
  const bW = 1.7 * scale;
  const bL = 4.4 * scale;
  const bH = 1.6 * scale;
  const elevH = config.roofHeight * scale;
  const elevL = config.roofLength * scale;
  const bPillar = 1.2 * scale;
  const tankL = 0.8 * scale;
  const tankH = 0.3 * (config.waterTankCapacity / 100) * scale;
  const tankX = 50 + (2.2 - 0.4) * scale;
  const tankY = elevH + 50 + bH - 0.55 * scale;

  const panels = Array.from({ length: config.solarPanels }).map((_, i) =>
    `<rect x="${60 + bL - bPillar - 40 - elevL + 10 + i * 28}" y="80" width="22" height="${elevH - 4}" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8" rx="2"/>`
  ).join('');

  const panelsTop = Array.from({ length: config.solarPanels }).map((_, i) =>
    `<rect x="${60 + 60 + i * 50}" y="${elevH + bH + 132}" width="40" height="${bW - 30}" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8" rx="2"/>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e3a5f" stroke-width="0.4"/>
    </pattern>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="50%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a192f"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="30" y="30" fill="#60a5fa" font-size="14" font-family="monospace" font-weight="bold">KOMBIHOME CREATOR — PLANTA TÉCNICA</text>
  <text x="30" y="48" fill="#3b82f6" font-size="9" font-family="monospace">por MaicknucleaR (Edição Beto) // Escala 1:50 // Gerado automaticamente</text>
  <line x1="20" y1="56" x2="${W - 20}" y2="56" stroke="#1e3a8a" stroke-width="1"/>
  <text x="30" y="72" fill="#475569" font-size="8" font-family="monospace">TETO: ${config.roofHeight}m | ELEV: ${config.roofLength}m | SOLAR: ${config.solarPanels}x | TANQUE: ${config.waterTankCapacity}L | AR-COND: ${(config.acPosition * 100).toFixed(0)}%</text>

  <text x="30" y="100" fill="#60a5fa" font-size="9" font-family="monospace" font-weight="bold">VISTA LATERAL</text>
  <line x1="20" y1="${elevH + 80 + bH + 32}" x2="${bL + 180}" y2="${elevH + 80 + bH + 32}" stroke="#334155" stroke-width="1" stroke-dasharray="6 3"/>
  <rect x="60" y="${elevH + 80}" width="${bL}" height="${bH}" fill="url(#body)" stroke="#3b82f6" stroke-width="1.5" rx="12"/>
  <line x1="60" y1="${elevH + 80 + bH / 2}" x2="${60 + bL}" y2="${elevH + 80 + bH / 2}" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="3 2"/>
  <rect x="${60 + 90}" y="${elevH + 95}" width="46" height="30" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8" opacity="0.9"/>
  <rect x="${60 + 150}" y="${elevH + 95}" width="46" height="30" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8" opacity="0.9"/>
  <rect x="${60 + 215}" y="${elevH + 95}" width="46" height="30" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8" opacity="0.9"/>
  <rect x="${60 + bL - bPillar - 40 - elevL}" y="80" width="${elevL}" height="${elevH}" fill="#1e293b" stroke="#60a5fa" stroke-width="2" rx="5"/>
  <rect x="${60 + bL - bPillar - 40 - elevL + config.acPosition * elevL - 22}" y="66" width="44" height="14" fill="#334155" stroke="#60a5fa" stroke-width="1" rx="2"/>
  <text x="${60 + bL - bPillar - 40 - elevL + config.acPosition * elevL}" y="60" text-anchor="middle" fill="#60a5fa" font-size="7" font-family="monospace">AR-COND</text>
  ${panels}
  <circle cx="${60 + 90}" cy="${elevH + 80 + bH + 2}" r="24" fill="#020617" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="${60 + 90}" cy="${elevH + 80 + bH + 2}" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
  <circle cx="${60 + 90}" cy="${elevH + 80 + bH + 2}" r="5" fill="#3b82f6"/>
  <circle cx="${60 + bL - 90}" cy="${elevH + 80 + bH + 2}" r="24" fill="#020617" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="${60 + bL - 90}" cy="${elevH + 80 + bH + 2}" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
  <circle cx="${60 + bL - 90}" cy="${elevH + 80 + bH + 2}" r="5" fill="#3b82f6"/>
  <rect x="${tankX - tankL / 2}" y="${tankY - tankH / 2}" width="${tankL}" height="${tankH}" fill="#3b82f6" opacity="0.35" stroke="#60a5fa" stroke-width="1" rx="3"/>
  <text x="${tankX}" y="${tankY + tankH / 2 + 13}" text-anchor="middle" fill="#60a5fa" font-size="8" font-family="monospace" font-weight="bold">TANQUE ${config.waterTankCapacity}L</text>
  <line x1="60" y1="68" x2="${60 + bL}" y2="68" stroke="#60a5fa" stroke-width="0.8"/>
  <text x="${60 + bL / 2}" y="62" text-anchor="middle" fill="#60a5fa" font-size="10" font-family="monospace" font-weight="bold">${(bL / scale).toFixed(1)}m</text>
  <line x1="${60 + bL - bPillar - 40 - elevL}" y1="68" x2="${60 + bL - bPillar - 40}" y2="68" stroke="#60a5fa" stroke-width="0.8"/>
  <text x="${60 + bL - bPillar - 40 - elevL / 2}" y="62" text-anchor="middle" fill="#93c5fd" font-size="9" font-family="monospace">${config.roofLength}m</text>

  <text x="30" y="${elevH + bH + 115}" fill="#60a5fa" font-size="9" font-family="monospace" font-weight="bold">VISTA SUPERIOR</text>
  <rect x="60" y="${elevH + bH + 122}" width="${bL}" height="${bW}" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="12"/>
  <rect x="${60 + 40}" y="${elevH + bH + 127}" width="${elevL}" height="${bW - 10}" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="5 3" rx="8"/>
  ${panelsTop}
  <line x1="60" y1="${elevH + bH + 118}" x2="${60 + bL}" y2="${elevH + bH + 118}" stroke="#60a5fa" stroke-width="0.8"/>
  <text x="${60 + bL / 2}" y="${elevH + bH + 112}" text-anchor="middle" fill="#60a5fa" font-size="10" font-family="monospace" font-weight="bold">${(bL / scale).toFixed(1)}m</text>

  <line x1="20" y1="${H - 50}" x2="${W - 20}" y2="${H - 50}" stroke="#1e3a8a" stroke-width="1"/>
  <text x="30" y="${H - 32}" fill="#334155" font-size="8" font-family="monospace">KOMBIHOME ENGINEERING // REV.1.0 // ${new Date().toLocaleDateString('pt-BR')}</text>
  <text x="${W - 30}" y="${H - 32}" text-anchor="end" fill="#334155" font-size="8" font-family="monospace">ESCALA 1:50</text>
</svg>`;
}

export const BlueprintPDF: React.FC<Props> = ({ config }) => {
  const [loading, setLoading] = React.useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const svgStr = buildBlueprintSVG(config);
      const win = window.open('', '_blank');
      if (!win) return;
      win.document.write(`<!DOCTYPE html><html><head><title>KombiHome — Planta Técnica</title>
        <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a192f;display:flex;justify-content:center;padding:20px;}svg{max-width:100%;height:auto;}@media print{body{background:white;padding:0;}svg{width:100%;height:auto;}}</style>
        <script>window.onload=()=>{setTimeout(()=>window.print(),500);}<\/script>
      </head><body>${svgStr}</body></html>`);
      win.document.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={loading}
      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10 uppercase tracking-wider">
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
      Exportar PDF
    </button>
  );
};
