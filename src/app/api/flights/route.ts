import { NextResponse } from 'next/server';

const mockFlights = [
  { flightNumber: 'AA100', startTime: '08:00 AM', endTime: '11:30 AM', timeZone: 'EST', startLocation: 'New York (JFK)', endLocation: 'London (LHR)' },
  { flightNumber: 'DL200', startTime: '02:15 PM', endTime: '04:45 PM', timeZone: 'PST', startLocation: 'Los Angeles (LAX)', endLocation: 'Chicago (ORD)' },
  { flightNumber: 'UA300', startTime: '06:00 AM', endTime: '08:30 AM', timeZone: 'CST', startLocation: 'Chicago (ORD)', endLocation: 'Miami (MIA)' },
  { flightNumber: 'SW400', startTime: '10:30 AM', endTime: '12:00 PM', timeZone: 'MST', startLocation: 'Denver (DEN)', endLocation: 'Las Vegas (LAS)' },
  { flightNumber: 'BA101', startTime: '09:00 AM', endTime: '12:30 PM', timeZone: 'GMT', startLocation: 'London (LHR)', endLocation: 'Paris (CDG)' },
  { flightNumber: 'AF202', startTime: '11:15 AM', endTime: '01:45 PM', timeZone: 'CET', startLocation: 'Paris (CDG)', endLocation: 'Berlin (BER)' },
  { flightNumber: 'LH303', startTime: '07:30 AM', endTime: '09:45 AM', timeZone: 'CET', startLocation: 'Frankfurt (FRA)', endLocation: 'Rome (FCO)' },
  { flightNumber: 'EK404', startTime: '03:45 PM', endTime: '08:15 PM', timeZone: 'GST', startLocation: 'Dubai (DXB)', endLocation: 'Mumbai (BOM)' },
  { flightNumber: 'QR505', startTime: '10:00 PM', endTime: '02:30 AM', timeZone: 'AST', startLocation: 'Doha (DOH)', endLocation: 'Singapore (SIN)' },
  { flightNumber: 'SQ606', startTime: '01:30 AM', endTime: '05:00 AM', timeZone: 'SGT', startLocation: 'Singapore (SIN)', endLocation: 'Tokyo (NRT)' },
  { flightNumber: 'CX707', startTime: '04:45 PM', endTime: '09:15 PM', timeZone: 'HKT', startLocation: 'Hong Kong (HKG)', endLocation: 'Sydney (SYD)' },
  { flightNumber: 'QF808', startTime: '08:30 AM', endTime: '11:00 AM', timeZone: 'AEST', startLocation: 'Sydney (SYD)', endLocation: 'Melbourne (MEL)' },
  { flightNumber: 'NZ909', startTime: '12:15 PM', endTime: '03:45 PM', timeZone: 'NZST', startLocation: 'Auckland (AKL)', endLocation: 'Fiji (NAN)' },
  { flightNumber: 'JL111', startTime: '10:45 AM', endTime: '01:15 PM', timeZone: 'JST', startLocation: 'Tokyo (HND)', endLocation: 'Seoul (ICN)' },
  { flightNumber: 'KE222', startTime: '02:30 PM', endTime: '05:00 PM', timeZone: 'KST', startLocation: 'Seoul (ICN)', endLocation: 'Shanghai (PVG)' },
  { flightNumber: 'CA333', startTime: '06:15 AM', endTime: '08:45 AM', timeZone: 'CST', startLocation: 'Beijing (PEK)', endLocation: 'Bangkok (BKK)' },
  { flightNumber: 'TG444', startTime: '09:30 AM', endTime: '12:00 PM', timeZone: 'ICT', startLocation: 'Bangkok (BKK)', endLocation: 'Singapore (SIN)' },
  { flightNumber: 'MH555', startTime: '11:45 PM', endTime: '03:15 AM', timeZone: 'MYT', startLocation: 'Kuala Lumpur (KUL)', endLocation: 'Jakarta (CGK)' },
  { flightNumber: 'GA666', startTime: '07:15 AM', endTime: '09:45 AM', timeZone: 'WIB', startLocation: 'Jakarta (CGK)', endLocation: 'Bali (DPS)' },
  { flightNumber: 'VN777', startTime: '01:00 PM', endTime: '03:30 PM', timeZone: 'ICT', startLocation: 'Ho Chi Minh (SGN)', endLocation: 'Hanoi (HAN)' },
  { flightNumber: 'AI888', startTime: '04:30 PM', endTime: '07:00 PM', timeZone: 'IST', startLocation: 'Delhi (DEL)', endLocation: 'Bangalore (BLR)' },
  { flightNumber: 'EY999', startTime: '10:15 PM', endTime: '02:45 AM', timeZone: 'GST', startLocation: 'Abu Dhabi (AUH)', endLocation: 'Istanbul (IST)' },
  { flightNumber: 'TK123', startTime: '08:45 AM', endTime: '11:15 AM', timeZone: 'TRT', startLocation: 'Istanbul (IST)', endLocation: 'Athens (ATH)' },
  { flightNumber: 'LX456', startTime: '12:30 PM', endTime: '02:00 PM', timeZone: 'CET', startLocation: 'Zurich (ZRH)', endLocation: 'Vienna (VIE)' },
  { flightNumber: 'OS789', startTime: '03:15 PM', endTime: '04:45 PM', timeZone: 'CET', startLocation: 'Vienna (VIE)', endLocation: 'Munich (MUC)' },
  { flightNumber: 'AY101', startTime: '06:00 AM', endTime: '08:30 AM', timeZone: 'EET', startLocation: 'Helsinki (HEL)', endLocation: 'Stockholm (ARN)' },
  { flightNumber: 'SK202', startTime: '09:45 AM', endTime: '11:15 AM', timeZone: 'CET', startLocation: 'Copenhagen (CPH)', endLocation: 'Oslo (OSL)' },
  { flightNumber: 'KL303', startTime: '01:15 PM', endTime: '02:45 PM', timeZone: 'CET', startLocation: 'Amsterdam (AMS)', endLocation: 'Brussels (BRU)' },
  { flightNumber: 'IB404', startTime: '04:00 PM', endTime: '05:30 PM', timeZone: 'CET', startLocation: 'Madrid (MAD)', endLocation: 'Lisbon (LIS)' },
  { flightNumber: 'TP505', startTime: '07:30 PM', endTime: '09:00 PM', timeZone: 'WET', startLocation: 'Lisbon (LIS)', endLocation: 'Porto (OPO)' },
  { flightNumber: 'ET606', startTime: '11:45 PM', endTime: '05:15 AM', timeZone: 'EAT', startLocation: 'Addis Ababa (ADD)', endLocation: 'Nairobi (NBO)' },
  { flightNumber: 'SA707', startTime: '08:15 AM', endTime: '10:45 AM', timeZone: 'SAST', startLocation: 'Johannesburg (JNB)', endLocation: 'Cape Town (CPT)' }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!flightNumber) {
    // Return list of all available flight numbers if no specific one is requested
    return NextResponse.json(mockFlights.map(f => f.flightNumber));
  }

  const flight = mockFlights.find(
    f => f.flightNumber.toLowerCase() === flightNumber.toLowerCase()
  );

  if (!flight) {
    return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
  }

  return NextResponse.json(flight);
}
