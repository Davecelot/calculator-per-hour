import test from 'node:test';
import assert from 'node:assert/strict';

import { fetchRates, normalizeRates } from './currency.js';

test('normalizeRates converts source keys to uppercase and includes base=1', () => {
  const payload = {
    date: '2026-01-01',
    usd: {
      eur: 0.91,
      ars: 1099.22,
      usd: 1,
      note: 'ignore',
    },
  };

  const rates = normalizeRates(payload, 'USD');

  assert.equal(rates.USD, 1);
  assert.equal(rates.EUR, 0.91);
  assert.equal(rates.ARS, 1099.22);
  assert.equal(rates.NOTE, undefined);
});

test('fetchRates returns normalized rates for selected base', async (t) => {
  const originalFetch = global.fetch;
  t.after(() => {
    global.fetch = originalFetch;
  });

  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      date: '2026-01-01',
      usd: { eur: 0.9, gbp: 0.78 },
    }),
  });

  const rates = await fetchRates('USD');

  assert.deepEqual(rates, {
    USD: 1,
    EUR: 0.9,
    GBP: 0.78,
  });
});
