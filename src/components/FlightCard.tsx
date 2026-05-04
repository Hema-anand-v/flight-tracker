import React from 'react';

export interface FlightData {
  flightNumber: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  startLocation: string;
  endLocation: string;
}

export default function FlightCard({ flight }: { flight: FlightData }) {
  return (
    <div className="flight-card">
      <div className="flight-header">
        <span className="flight-number">{flight.flightNumber.toUpperCase()}</span>
        <span className="flight-status">On Time</span>
      </div>
      
      <div className="flight-route">
        <div className="route-point">
          <div className="time">{flight.startTime}</div>
          <div className="timezone">{flight.timeZone}</div>
          <div className="location">{flight.startLocation}</div>
        </div>
        
        <div className="route-line"></div>
        
        <div className="route-point">
          <div className="time">{flight.endTime}</div>
          <div className="timezone">{flight.timeZone}</div>
          <div className="location">{flight.endLocation}</div>
        </div>
      </div>
    </div>
  );
}
