export function formatCurrency(value, currency) {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
