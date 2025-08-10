import React from 'react';
import { Card } from './ui/card';
import BreakdownAccordion from './BreakdownAccordion';
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
    <Card className="p-4">
      <h2 className="text-base font-semibold mb-3">Resultado del proyecto</h2>
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
    </Card>
  );
}
