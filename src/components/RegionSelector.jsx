import React from 'react';
import AccessibleSelect from './AccessibleSelect';

export default function RegionSelector({ region, setRegion, currency, setCurrency }) {
  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <AccessibleSelect
          label="Región (preset)"
          id="region"
          value={region}
          onChange={setRegion}
          options={[
            { value: 'LATAM', label: 'Latinoamérica (preset)' },
            { value: 'EU_WEST', label: 'Europa Occidental (preset)' },
            { value: 'EU_EAST', label: 'Europa del Este (preset)' },
            { value: 'USA', label: 'USA / Canadá (preset)' }
          ]}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <AccessibleSelect
          label="Moneda"
          id="currency"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: 'USD', label: 'USD ($)' },
            { value: 'EUR', label: 'EUR (€)' },
            { value: 'ARS', label: 'ARS ($)' },
            { value: 'GBP', label: 'GBP (£)' }
          ]}
        />
      </div>
    </>
  );
}
