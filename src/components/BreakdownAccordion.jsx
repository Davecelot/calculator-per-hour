import React from 'react';
import { formatCurrency } from '@/utils/format';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/**
 * Collapsible section with calculation details.
 */
export default function BreakdownAccordion({
  semanasProyecto,
  utilizacion,
  precioA,
  precioB,
  currency,
}) {
  return (
    <Accordion type="single" collapsible className="mt-2">
      <AccordionItem value="details">
        <AccordionTrigger className="text-sm text-[var(--brand)]">
          Ver desglose
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-2 text-sm space-y-1">
            <div>Semanas del proyecto: {semanasProyecto.toFixed(2)}</div>
            <div>Utilización asumida: {utilizacion}%</div>
            <div>Fórmula A: {formatCurrency(precioA, currency)}</div>
            <div>Fórmula B: {formatCurrency(precioB, currency)}</div>
            <div>Overhead y margen ya contemplados en la tarifa anual.</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
