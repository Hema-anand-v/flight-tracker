"use client";

import React, { useState, useEffect } from 'react';
import FlightCard, { FlightData } from './FlightCard';

export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState('');
  const [availableFlights, setAvailableFlights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingFlights, setFetchingFlights] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  useEffect(() => {
    const fetchFlightNumbers = async () => {
      try {
        const response = await fetch('/api/flights');
        if (!response.ok) throw new Error('Failed to fetch flight list');
        const data = await response.json();
        setAvailableFlights(data);
      } catch (err) {
        console.error('Error fetching flight numbers:', err);
      } finally {
        setFetchingFlights(false);
      }
    };

    fetchFlightNumbers();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber) return;

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
        <select
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          className="search-input"
          required
          disabled={fetchingFlights}
        >
          <option value="" disabled>
            {fetchingFlights ? 'Loading flights...' : 'Select a flight number'}
          </option>
          {availableFlights.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button type="submit" className="search-button" disabled={loading || !flightNumber}>
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
