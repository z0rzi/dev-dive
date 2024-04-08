type Flight = {
  from: string;
  to: string;
  date: Date | string;
  durationInMins: number;
};

function* findAWay(
  current: string,
  destination: string,
  flights: Flight[],
  currentTime?: Date
): Generator<string[], null, void> {
  for (let { from, to, date, durationInMins } of flights) {
    if (typeof date === "string") date = new Date(date);

    if (from !== current || (currentTime && currentTime > date)) {
      // We are not leaving from this airport, we skip it
      continue;
    }

    if (to === destination) {
      // We Arrived to destination
      yield [from, to];
      return null;
    }

    // we remove all flights that are leaving from the current airport, to
    // avoid infinite loops
    const newFlights = flights.filter(({ from: _from }) => _from !== from);

    const arrivalDate = new Date(date);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationInMins);

    const res = findAWay(to, destination, newFlights, arrivalDate);

    for (const restOfTrip of res) {
      const itinerary = [from, ...restOfTrip];

      yield itinerary;
    }
  }

  return null;
}

const itineraries = findAWay("USA", "BRA", [
  {
    from: "USA",
    to: "FRA",
    date: "2025-01-01T00:00",
    durationInMins: 150,
  },
  {
    from: "FRA",
    to: "BRA",
    date: "2024-12-31T12:00",
    durationInMins: 300,
  },
  {
    from: "USA",
    to: "JPN",
    date: "2025-01-03T08:00",
    durationInMins: 400,
  },
  {
    from: "USA",
    to: "CAN",
    date: "2025-01-01T10:00",
    durationInMins: 200,
  },
  {
    from: "CAN",
    to: "COL",
    date: "2025-01-03T10:00",
    durationInMins: 200,
  },
  {
    from: "COL",
    to: "BRA",
    date: "2025-01-05T15:00",
    durationInMins: 250,
  },
]);

const possibleItineraries = Array.from(itineraries);
// sorting by length
possibleItineraries.sort((a, b) => a.length - b.length);

// showing the best itinerary
console.log(possibleItineraries[0]);
