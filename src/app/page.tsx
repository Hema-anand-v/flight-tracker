import FlightSearch from '@/components/FlightSearch';

export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <h1>Global Flight Tracker</h1>
        <p>Experience real-time insights with a premium touch. Track your journey effortlessly.</p>
      </div>
      
      <FlightSearch />
    </main>
  );
}
