import React from 'react';

export default function RegionSelector({ region, setRegion, currency, setCurrency }) {
  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <label className="text-xs muted">Región (preset)</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="LATAM">Latinoamérica (preset)</option>
          <option value="EU_WEST">Europa Occidental (preset)</option>
          <option value="EU_EAST">Europa del Este (preset)</option>
          <option value="USA">USA / Canadá (preset)</option>
        </select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <label className="text-xs muted">Moneda (solo visual)</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="ARS">ARS ($)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>
    </>
  );
}