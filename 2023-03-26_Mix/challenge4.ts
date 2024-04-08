type Flight = {
  from: string;
  to: string;
  date: Date | string;
  durationInMins: number;
  price: number;
};

type TripOverview = {
  itinerary: Flight[];
  cost: number;
};

function* findAWay(
  current: string,
  destination: string,
  flights: Flight[],
  currentTime?: Date
): Generator<TripOverview, null, void> {
  for (const flight of flights) {
    let { from, to, date, durationInMins, price } = flight;

    if (typeof date === "string") date = new Date(date);

    if (from !== current || (currentTime && currentTime > date)) {
      // We are not leaving from this airport, we skip it
      continue;
    }

    if (to === destination) {
      // We Arrived to destination
      yield {
        itinerary: [flight],
        cost: price,
      };
      return null;
    }

    // we remove all flights that are leaving from the current airport, to
    // avoid infinite loops
    const newFlights = flights.filter(({ from: _from }) => _from !== from);

    const arrivalDate = new Date(date);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationInMins);

    const res = findAWay(to, destination, newFlights, arrivalDate);

    for (const restOfTrip of res) {
      const itinerary = [flight, ...restOfTrip.itinerary];

      yield {
        itinerary,
        cost: price + restOfTrip.cost,
      };
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
    price: 200,
  },
  {
    from: "FRA",
    to: "BRA",
    date: "2025-01-02T04:00",
    durationInMins: 120,
    price: 400,
  },
  {
    from: "USA",
    to: "TEX",
    date: "2025-01-01T23:00",
    durationInMins: 30,
    price: 50,
  },
  {
    from: "TEX",
    to: "FRA",
    date: "2025-01-02T00:00",
    durationInMins: 60,
    price: 70,
  },
]);

const possibleItineraries = Array.from(itineraries);
// sorting by length
possibleItineraries.sort((a, b) => a.cost - b.cost);

let idx = 1;
// showing the itineraries
for (const itineraryInfo of possibleItineraries) {
  const startDate = new Date(itineraryInfo.itinerary[0].date);
  const lastTrip = itineraryInfo.itinerary[itineraryInfo.itinerary.length - 1];
  const endDate = new Date(
    Date.parse(lastTrip.date.toString()) + +lastTrip.durationInMins * 60 * 1000
  );

  const totalTravelTime = (+endDate - +startDate) / 1000 / 60 / 60;

  console.log(
    `\nOption ${idx++}: (${totalTravelTime}h, ${itineraryInfo.cost}€)`
  );

  let lastTripEnd = undefined as number | undefined;
  for (const stop of itineraryInfo.itinerary) {
    const fromDate = new Date(stop.date);
    const toDate = new Date(+fromDate + stop.durationInMins * 60 * 1000);

    if (lastTripEnd) {
      const layoverTime = (+fromDate - lastTripEnd) / 1000 / 60 / 60;
      console.log(`  Layover in ${stop.from} of ${layoverTime}h`);
    }

    lastTripEnd = +toDate;

    console.log(
      `  [${fromDate.toISOString()}] ${stop.from} => ${
        stop.to
      } ${toDate.toISOString()}`
    );
  }
}

// Option 1 (30h of travel, 600€):
//   [2023-01-01] 00:00 USA => FRA 02:30
//   Layover in FRA of 25h30
//   [2023-01-02] 04:00 FRA => BRA 06:00
