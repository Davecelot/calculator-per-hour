import { useEffect, useState } from 'react';

// Fetch USD-based exchange rates for supported currencies.
export function useExchangeRates() {
  const [rates, setRates] = useState({ USD: 1 });

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,ARS,GBP');
        const data = await res.json();
        if (data && data.rates) {
          setRates({ USD: 1, ...data.rates });
        }
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      }
    }

    fetchRates();
  }, []);

  return rates;
}
