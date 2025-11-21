import React from 'react';

export default function RegionSelector({ region, setRegion, currency, setCurrency }) {
  return (
    <>
      <div className="input-group">
        <label className="input-label">Region (Preset)</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="tech-input appearance-none"
        >
          <option value="LATAM">LATAM (Latin America)</option>
          <option value="EU_WEST">EU_WEST (Western Europe)</option>
          <option value="EU_EAST">EU_EAST (Eastern Europe)</option>
          <option value="USA">USA (North America)</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Currency (Convert)</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="tech-input appearance-none"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="ARS">ARS ($)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>
    </>
  );
}