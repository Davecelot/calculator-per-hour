/**
 * Service to fetch currency exchange rates from Fawaz Ahmed Currency API.
 * Repo: https://github.com/fawazahmed0/currency-api
 */

const API_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

function normalizeRates(payload, base) {
  if (!payload || typeof payload !== 'object') return null;

  const baseKey = base.toLowerCase();
  const baseRates = payload[baseKey];
  if (!baseRates || typeof baseRates !== 'object') return null;

  return Object.entries(baseRates).reduce((acc, [code, value]) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      acc[code.toUpperCase()] = value;
    }
    return acc;
  }, { [base.toUpperCase()]: 1 });
}

/**
 * Fetch latest exchange rates for a base currency.
 * @param {string} base - Base currency code (e.g., 'USD')
 * @returns {Promise<Object|null>} - Object containing rates (e.g., { EUR: 0.85, ... })
 */
export async function fetchRates(base = 'USD') {
  try {
    const normalizedBase = base.toLowerCase();
    const response = await fetch(`${API_URL}/${normalizedBase}.json`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rates = normalizeRates(data, base);

    if (!rates) {
      throw new Error('Unexpected currency API response format');
    }

    return rates;
  } catch (error) {
    console.error('Currency fetch error:', error);
    return null;
  }
}

export { normalizeRates };
