import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

/**
 * Inputs for project mode assumptions.
 * Props follow naming in state: meses, setMeses, dedicacion, setDedicacion, buffer, setBuffer, roundingStep, setRoundingStep
 */
export default function ProjectControls({
  meses,
  setMeses,
  dedicacion,
  setDedicacion,
  buffer,
  setBuffer,
  roundingStep,
  setRoundingStep,
}) {
  return (
    <Card className="p-4 mt-4">
      <h2 className="text-base font-semibold mb-3">Proyecto</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="meses">Duración del proyecto (meses)</Label>
          <Input
            id="meses"
            type="range"
            min={1}
            max={12}
            step={1}
            value={meses}
            onChange={(e) => setMeses(parseInt(e.target.value))}
            aria-valuemin={1}
            aria-valuemax={12}
            aria-valuenow={meses}
          />
          <div className="text-sm mt-1">{meses} meses</div>
        </div>

        <div>
          <Label htmlFor="dedicacion">Dedicación al proyecto (%)</Label>
          <Input
            id="dedicacion"
            type="range"
            min={10}
            max={100}
            step={1}
            value={dedicacion}
            onChange={(e) => setDedicacion(parseInt(e.target.value))}
            aria-valuemin={10}
            aria-valuemax={100}
            aria-valuenow={dedicacion}
          />
          <div className="text-sm mt-1">{dedicacion}%</div>
        </div>

        <div>
          <Label htmlFor="buffer">Buffer/Riesgo (%)</Label>
          <select
            id="buffer"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--panel)] p-2 text-sm"
            value={buffer}
            onChange={(e) => setBuffer(parseInt(e.target.value))}
          >
            {[0, 10, 15, 20, 30].map((b) => (
              <option key={b} value={b}>
                {b}%
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="round">Redondear</Label>
          <select
            id="round"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--panel)] p-2 text-sm"
            value={roundingStep}
            onChange={(e) => setRoundingStep(parseInt(e.target.value))}
          >
            <option value={0}>Sin redondeo</option>
            <option value={100}>a $100</option>
            <option value={1000}>a $1.000</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
