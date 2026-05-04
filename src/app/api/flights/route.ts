import { NextResponse } from 'next/server';

const mockFlights = [
  {
    flightNumber: 'AA100',
    startTime: '08:00 AM',
    endTime: '11:30 AM',
    timeZone: 'EST',
    startLocation: 'New York (JFK)',
    endLocation: 'London (LHR)'
  },
  {
    flightNumber: 'DL200',
    startTime: '02:15 PM',
    endTime: '04:45 PM',
    timeZone: 'PST',
    startLocation: 'Los Angeles (LAX)',
    endLocation: 'Chicago (ORD)'
  },
  {
    flightNumber: 'UA300',
    startTime: '06:00 AM',
    endTime: '08:30 AM',
    timeZone: 'CST',
    startLocation: 'Chicago (ORD)',
    endLocation: 'Miami (MIA)'
  },
  {
    flightNumber: 'SW400',
    startTime: '10:30 AM',
    endTime: '12:00 PM',
    timeZone: 'MST',
    startLocation: 'Denver (DEN)',
    endLocation: 'Las Vegas (LAS)'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!flightNumber) {
    return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
  }

  const flight = mockFlights.find(
    f => f.flightNumber.toLowerCase() === flightNumber.toLowerCase()
  );

  if (!flight) {
    return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
  }

  return NextResponse.json(flight);
}
