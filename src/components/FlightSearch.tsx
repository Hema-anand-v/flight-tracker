"use client";

import React, { useState } from 'react';
import FlightCard, { FlightData } from './FlightCard';

export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim()) return;

    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const response = await fetch(`/api/flights?flightNumber=${encodeURIComponent(flightNumber)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch flight');
      }

      setFlightData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Enter flight number (e.g. AA100)"
          className="search-input"
          required
        />
        <button type="submit" className="search-button" disabled={loading || !flightNumber.trim()}>
          {loading ? 'Searching...' : 'Search Flight'}
        </button>
      </form>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {flightData && (
        <FlightCard flight={flightData} />
      )}
    </div>
  );
}
