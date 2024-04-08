// create_flights.ts
const fs = require("fs");
var saveFlights = function(flights) {
  fs.writeFileSync("./flights.json", JSON.stringify(flights, null, 2));
  console.log("\nFlights saved to 'flights.json'");
};
if (process.argv.length < 3) {
  console.error("Usage: node create_flights.js <CHALLENGE_NUMBER> <ORIGIN> <DESTINATION>");
  process.exit(1);
}
var airportNames = ["CDG", "BKK", "LAX", "SIN", "CAN", "PVG", "HND"];
var start_date = new Date(2024, 0, 1);
var challengeNumber = parseInt(process.argv[2]);
var origin = process.argv[3];
var destination = process.argv[4];
if (!airportNames.includes(origin)) {
  airportNames.push(origin);
}
if (!airportNames.includes(destination)) {
  airportNames.push(destination);
}
var possibleFlights = [];
var unusedAirports = new Set(airportNames);
unusedAirports.delete(origin);
var totalTripTime = 0;
var totalTripPrice = 0;
var itinerary = [origin];
var currentAirport = origin;
var date = new Date(start_date);
while (true) {
  const nextStopIdx = Math.floor(Math.random() * unusedAirports.size);
  const nextStop = Array.from(unusedAirports)[nextStopIdx];
  unusedAirports.delete(nextStop);
  itinerary.push(nextStop);
  const duration = Math.floor(Math.random() * 500) + 60;
  const layoverTime = currentAirport === origin ? 0 : Math.floor(Math.random() * 60) + 10;
  const price = Math.floor(Math.random() * 500) + 60;
  date.setMinutes(date.getMinutes() + duration + layoverTime);
  totalTripTime += duration + layoverTime;
  totalTripPrice += price;
  possibleFlights.push({
    from: currentAirport,
    to: nextStop,
    date: new Date(date),
    durationInMins: duration,
    price
  });
  currentAirport = nextStop;
  if (currentAirport === destination) {
    break;
  }
}
var randomFlightsAmount = Math.floor(Math.random() * 10) + 5;
for (let i = 0;i < randomFlightsAmount * 2; i++) {
  const fromIdx = Math.floor(Math.random() * airportNames.length);
  const toIdx = Math.floor(Math.random() * airportNames.length);
  if (fromIdx === toIdx) {
    continue;
  }
  const from = airportNames[fromIdx];
  const to = airportNames[toIdx];
  const duration = Math.floor(Math.random() * 500) + 60;
  const price = Math.floor(Math.random() * 500) + 60;
  const date2 = new Date(+start_date + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30));
  date2.setSeconds(0, 0);
  possibleFlights.push({
    from,
    to,
    date: new Date(date2),
    durationInMins: duration,
    price
  });
}
possibleFlights.sort(() => Math.random() - 0.5);
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
    durationInMins: flight.durationInMins
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
