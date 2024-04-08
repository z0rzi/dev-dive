function* findAWay(
  current: string,
  destination: string,
  flights: [string, string][]
): Generator<string[], null, void> {
  for (const [origin, dest] of flights) {
    if (origin !== current) {
      // We are not leaving from this airport, we skip it
      continue;
    }

    if (dest === destination) {
      // We Arrived to destination
      yield [origin, dest];
      return null;
    }

    // we remove all flights that are leaving from the current airport, to
    // avoid infinite loops
    const newFlights = flights.filter(([o]) => o !== origin);

    const res = findAWay(dest, destination, newFlights);

    for (const restOfTrip of res) {
      const itinerary = [origin, ...restOfTrip];

      yield itinerary;
    }
  }

  return null;
}

const itineraries = findAWay("USA", "BRA", [
  ["USA", "JPN"],
  ["JPN", "ANG"],
  ["USA", "FRA"],
  ["ANG", "AUS"],
  ["PER", "FRA"],
  ["AUS", "BRA"],
  ["FRA", "BRA"],
]);


const possibleItineraries = Array.from(itineraries);
// sorting by length
possibleItineraries.sort((a, b) => a.length - b.length);

// showing the best itinerary
console.log(possibleItineraries[0]);
