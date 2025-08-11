import React from 'react';
import { BrandCard } from '@/components/brand/BrandCard';
import { Label } from './ui/label';
import { BrandSlider } from '@/components/brand/BrandSlider';
import { BrandSelect } from '@/components/brand/BrandSelect';

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
    <BrandCard className="mt-4">
      <h2 className="text-lg font-bold mb-3">Proyecto</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="meses">Duración del proyecto (meses)</Label>
          <BrandSlider
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
          <BrandSlider
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
          <BrandSelect
            value={buffer.toString()}
            onValueChange={(v) => setBuffer(parseInt(v))}
          >
            <BrandSelect.Trigger id="buffer" className="mt-1 w-full">
              <BrandSelect.Value />
            </BrandSelect.Trigger>
            <BrandSelect.Content>
              {[0, 10, 15, 20, 30].map((b) => (
                <BrandSelect.Item key={b} value={b.toString()}>
                  {b}%
                </BrandSelect.Item>
              ))}
            </BrandSelect.Content>
          </BrandSelect>
        </div>

        <div>
          <Label htmlFor="round">Redondear</Label>
          <BrandSelect
            value={roundingStep.toString()}
            onValueChange={(v) => setRoundingStep(parseInt(v))}
          >
            <BrandSelect.Trigger id="round" className="mt-1 w-full">
              <BrandSelect.Value />
            </BrandSelect.Trigger>
            <BrandSelect.Content>
              <BrandSelect.Item value="0">Sin redondeo</BrandSelect.Item>
              <BrandSelect.Item value="100">a $100</BrandSelect.Item>
              <BrandSelect.Item value="1000">a $1.000</BrandSelect.Item>
            </BrandSelect.Content>
          </BrandSelect>
        </div>
      </div>
    </BrandCard>
  );
}
