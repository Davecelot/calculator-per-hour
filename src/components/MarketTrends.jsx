import React from 'react';
import { Card } from './ui/card';

export default function MarketTrends() {
  const data = [80, 100, 90, 110, 125, 150];
  const width = 300;
  const height = 100;
  const max = Math.max(...data);
  const path = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d / max) * height;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <Card>
      <h2 className="text-lg font-bold mb-3">Tendencia del mercado</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
        <path d={path} fill="none" stroke="var(--brand)" strokeWidth="2" />
      </svg>
    </Card>
  );
}
