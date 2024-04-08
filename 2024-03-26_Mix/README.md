# Challenge 1 - Flight finder

Given a list of flights (origin, destination), find a way to go from origin to destination:

```
findAWay(
    'USA',
    'BRA',
    [
        ['BRA', 'JPN'],
        ['USA', 'FRA'],
        ['PER', 'FRA'],
        ['FRA', 'BRA']
    ]
)

// => ['USA', 'FRA', 'BRA']
```

# Challenge 2 - Choosing the best possible solution

If multiple solutions are possible, make sure to choose the best one:

```
findAWay(
    'USA',
    'BRA',
    [
        ['USA', 'JPN'],
        ['JPN', 'ANG'],
        ['USA', 'FRA'],
        ['ANG', 'AUS'],
        ['PER', 'FRA'],
        ['AUS', 'BRA'],
        ['FRA', 'BRA']
    ]
)

// => NOT ['USA', 'JPN', 'ANG', 'AUS', 'BRA']
//
// => ['USA', 'FRA', 'BRA']
```

# Challenge 3 - Adding dates / times

We are now adding dates and durations to the flights. A passenger can only take a flight once his last flight landed.

For the purpose of this exercise, we assume that all the countries are in the same timezone.

```
findAWay(
    'USA',
    'BRA',
    [
        {
            from: 'USA',
            to: 'FRA',
            date: '2025-01-01T00:00',
            durationInMins: 150
        },
        {
            from: 'FRA',
            to: 'BRA',
            date: '2024-12-31T12:00',
            durationInMins: 300
        },
        {
            from: 'USA',
            to: 'JPN',
            date: '2025-01-03T08:00',
            durationInMins: 400
        },
        {
            from: 'USA',
            to: 'CAN',
            date: '2025-01-01T10:00',
            durationInMins: 200
        },
        {
            from: 'CAN',
            to: 'COL',
            date: '2025-01-03T10:00',
            durationInMins: 200
        },
        {
            from: 'COL',
            to: 'BRA',
            date: '2025-01-05T15:00',
            durationInMins: 250
        }
    ]
)

// => ['USA', 'CAN', 'COL', 'BRA']
```

# Challenge 4 - Adding money + Giving the choice

We now add a fare to each flight, and we give all the possible combinations to the user, to let him choose.

```
findAWay(
    'USA',
    'BRA',
    [
        {
            from: 'USA',
            to: 'FRA',
            date: '2025-01-01T00:00',
            durationInMins: 150,
            price: 200
        },
        {
            from: 'FRA',
            to: 'BRA',
            date: '2025-01-02T04:00',
            durationInMins: 120,
            price: 400
        },
        {
            from: 'USA',
            to: 'TEX',
            date: '2025-01-01T23:00',
            durationInMins: 30,
            price: 50
        },
        {
            from: 'TEX',
            to: 'FRA',
            date: '2025-01-02T00:00',
            durationInMins: 60,
            price: 70
        },

    ]
)

// Option 1 (30h of travel, 600€):
//   [2023-01-01] 00:00 USA => FRA 02:30
//   Layover in FRA of 25h30
//   [2023-01-02] 04:00 FRA => BRA 06:00
//
// Option 2 (7h of travel, 520€)
//   [2023-01-01] 23:00 USA => TEX 23:30
//   Layover in TEX of 0h30
//   [2023-01-02] 00:00 TEX => FRA 01:00
//   Layover in FRA of 3h00
//   [2023-01-02] 04:00 FRA => BRA [2023-01-02] 06:00
```
