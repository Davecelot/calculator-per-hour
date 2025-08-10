import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';

export default function DevelopmentTimePanel({ weeks, setWeeks, hoursPerWeek, setHoursPerWeek }) {
  const months = Math.round(weeks / 4);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (months / 12) * circumference;

  return (
    <Card className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Tiempo de desarrollo</h2>
      <svg width="120" height="120" className="mb-4">
        <circle cx="60" cy="60" r={radius} stroke="var(--border)" strokeWidth="8" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="var(--brand)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          transform="rotate(-90 60 60)"
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="text-xl font-bold fill-[var(--text)]"
        >
          {months}m
        </text>
      </svg>
      <Label className="w-full text-center mb-1">Meses</Label>
      <input
        type="range"
        min="1"
        max="12"
        value={months}
        onChange={(e) => setWeeks(parseInt(e.target.value, 10) * 4)}
        className="w-full mb-4"
        style={{ accentColor: 'var(--brand)' }}
      />
      <Label className="w-full text-center mb-1">Horas por semana: {hoursPerWeek}</Label>
      <input
        type="range"
        min="1"
        max="80"
        value={hoursPerWeek}
        onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
        className="w-full"
        style={{ accentColor: 'var(--brand)' }}
      />
    </Card>
  );
}
