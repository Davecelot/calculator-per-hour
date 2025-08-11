import React from 'react';
import BreakdownAccordion from './BreakdownAccordion';
import { BrandCard } from '@/components/brand/BrandCard';
import { formatCurrency } from '@/utils/format';

/**
 * Displays project pricing results.
 */
export default function ProjectResultCard({
  currency,
  tarifaHora,
  horasProyecto,
  precioFinal,
  tarifaEfectiva,
  semanasProyecto,
  utilizacion,
  precioBaseA,
  precioBaseB,
}) {
  return (
    <BrandCard className="mt-4">
      <h2 className="text-lg font-bold mb-3">Resultado del proyecto</h2>
      <div className="space-y-1 text-sm">
        <div>
          <strong>Precio mínimo recomendado:</strong> {formatCurrency(precioFinal, currency)}
        </div>
        <div>
          <strong>Horas estimadas del proyecto:</strong> {horasProyecto.toFixed(2)}h
        </div>
        <div>
          <strong>Tarifa base/hora:</strong> {formatCurrency(tarifaHora, currency)}
        </div>
        {horasProyecto > 0 && (
          <div>
            <strong>Tarifa efectiva del proyecto:</strong>{' '}
            {formatCurrency(tarifaEfectiva, currency)}
          </div>
        )}
      </div>
      <BreakdownAccordion
        semanasProyecto={semanasProyecto}
        utilizacion={utilizacion}
        precioA={precioBaseA}
        precioB={precioBaseB}
        currency={currency}
      />
    </BrandCard>
  );
}
