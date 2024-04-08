import fs from "fs";

if (process.argv.length < 3) {
  console.error(
    "Usage: node create_flights.js <CHALLENGE_NUMBER> <ORIGIN> <DESTINATION>"
  );
  process.exit(1);
}

type Flight = {
  from: string;
  to: string;
  date: Date;
  durationInMins: number;
  price: number;
};

const airportNames = ["CDG", "BKK", "LAX", "SIN", "CAN", "PVG", "HND"];

const start_date = new Date(2024, 0, 1);

const challengeNumber = parseInt(process.argv[2]);
const origin = process.argv[3] as string;
const destination = process.argv[4] as string;

if (!airportNames.includes(origin)) {
  airportNames.push(origin);
}
if (!airportNames.includes(destination)) {
  airportNames.push(destination);
}

const possibleFlights = [] as Flight[];

// Adding the right way to go from origin to destination

let unusedAirports = new Set(airportNames);
unusedAirports.delete(origin);

let totalTripTime = 0;
let totalTripPrice = 0;
let itinerary = [origin];

let currentAirport = origin;
const date = new Date(start_date);
while (true) {
  const nextStopIdx = Math.floor(Math.random() * unusedAirports.size);
  const nextStop = Array.from(unusedAirports)[nextStopIdx];

  unusedAirports.delete(nextStop);

  itinerary.push(nextStop);

  const duration = Math.floor(Math.random() * 500) + 60;
  const layoverTime =
    currentAirport === origin ? 0 : Math.floor(Math.random() * 60) + 10;

  const price = Math.floor(Math.random() * 500) + 60;

  date.setMinutes(date.getMinutes() + duration + layoverTime);

  totalTripTime += duration + layoverTime;
  totalTripPrice += price;

  possibleFlights.push({
    from: currentAirport,
    to: nextStop,
    date: new Date(date),
    durationInMins: duration,
    price: price,
  });

  currentAirport = nextStop;

  if (currentAirport === destination) {
    break;
  }
}

// Adding random flights

const randomFlightsAmount = Math.floor(Math.random() * 10) + 5;
for (let i = 0; i < randomFlightsAmount * 2; i++) {
  const fromIdx = Math.floor(Math.random() * airportNames.length);
  const toIdx = Math.floor(Math.random() * airportNames.length);

  if (fromIdx === toIdx) {
    continue;
  }

  const from = airportNames[fromIdx];
  const to = airportNames[toIdx];

  const duration = Math.floor(Math.random() * 500) + 60;
  const price = Math.floor(Math.random() * 500) + 60;

  const date = new Date(
    +start_date + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
  );
  date.setSeconds(0, 0);

  possibleFlights.push({
    from: from,
    to: to,
    date: new Date(date),
    durationInMins: duration,
    price: price,
  });
}

// Scrambling the flights
possibleFlights.sort(() => Math.random() - 0.5);

function saveFlights(flights: unknown) {
  fs.writeFileSync("./flights.json", JSON.stringify(flights, null, 2));
  console.log("\nFlights saved to 'flights.json'");
}

if (challengeNumber === 1) {
  const flights = possibleFlights.map((flight) => [flight.from, flight.to]);
  console.log(JSON.stringify(flights, null, 2));
  console.log(`\n\nItinerary: ${itinerary.join(" -> ")}`);

  saveFlights(flights);
} else if (challengeNumber === 2) {
  const flights = possibleFlights.map((flight) => ({
    from: flight.from,
    to: flight.to,
    date: flight.date.toISOString(),
    durationInMins: flight.durationInMins,
  }));
  console.log(JSON.stringify(flights, null, 2));

  console.log(`\n\nItinerary: ${itinerary.join(" -> ")}`);
  console.log(`Total trip time: ${totalTripTime} minutes`);

  saveFlights(flights);
} else {
  console.log(JSON.stringify(possibleFlights, null, 2));

  console.log(`\n\nItinerary: ${itinerary.join(" -> ")}`);
  console.log(`Total trip time: ${totalTripTime} minutes`);
  console.log(`Total trip price: ${totalTripPrice} euros`);

  saveFlights(possibleFlights);
}
