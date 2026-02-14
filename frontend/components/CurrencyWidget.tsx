'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function CurrencyWidget() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await api.get('/campaigns/rates/');
        if (response.data && response.data.rates) {
            setRates(response.data.rates);
        }
      } catch (error) {
        console.error('Failed to fetch rates', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) return <div>Loading rates...</div>;
  if (!rates) return null;

  const topCurrencies = ['EUR', 'GBP', 'JPY', 'CAD'];

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Live Exchange Rates (Base USD)</h3>
      <ul className="divide-y divide-gray-200">
        {topCurrencies.map(currency => (
          <li key={currency} className="py-2 flex justify-between">
            <span className="font-medium text-gray-700">{currency}</span>
            <span className="text-gray-500">{rates[currency]?.toFixed(4)}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-2">Source: open.er-api.com</p>
    </div>
  );
}
