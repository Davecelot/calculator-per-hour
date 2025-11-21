/**
 * Service to fetch currency exchange rates from Frankfurter API.
 * API Docs: https://www.frankfurter.app/docs/
 */

const API_URL = 'https://api.frankfurter.app';

/**
 * Fetch latest exchange rates for a base currency.
 * @param {string} base - Base currency code (e.g., 'USD')
 * @returns {Promise<Object>} - Object containing rates (e.g., { EUR: 0.85, ... })
 */
export async function fetchRates(base = 'USD') {
    try {
        const response = await fetch(`${API_URL}/latest?from=${base}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch rates: ${response.statusText}`);
        }
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Currency fetch error:', error);
        return null;
    }
}
