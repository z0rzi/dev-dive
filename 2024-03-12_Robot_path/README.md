Your job throughout this exercise will be to direct an exploration robot. The robot moves around, and collects soil samples.

# The Setup

You are provided with a visualisation interface, in the `web/` directory. To run it, follow the commands bellow:

```bash
cd web/

npm install

npm run start
```

Once that is done, you can open the server on your browser. ([http://localhost:8080](http://localhost:8080))


Depending on the language you want to use, you will have to change the input fields, for example:

For python:
```
Command: python3 robot.py
```

For NodeJS:
```
Command: node robot.js
```

For Typescript:
```
Command: deno robot.ts

OR

Command: bun robot.ts
```

For Rust:
```
CWD: [...]/dev-dive/2024-03-12_Robot_path/rust/
Command: cargo run
```

For C:
```
CWD: [...]/dev-dive/2024-03-12_Robot_path/c/
Command: gcc robot.c -o robot && ./robot
```

---

Once you're set up, click on the `Run Sequence` button, and you should see your robot movements, and the logs appear on the screen.

If you have any issue with the setup, let me know, I'll come to help!


# The Challenge

A few notes before we start:

- About the web interface:
    - The web interface is just here to assist you, and to visualize the robot movements. It does not "understand" the movements.
    - To show the robot position: `> 10;10`
    - The sequence you give on the web interface will be given as a command line argument to your script.

- The map on the web interface goes from coordinates -40;-40 to 40;40. The robot can go further, but you won't see it anymore.

- The robot should not, under any circumstances teleport. It should always move one block at a time, with no diagonal moves.

- The coordinates of the robot should always be integers.

- The robot should always start from the coordinates 0;0.

- The robot should always come back to base at the end, to bring back the samples.


# 1. Drive in a straight line

Right now, the robot moves randomly. Let's add a bit of logic to this mess.

Given a destination, the robot should be going there in a straight-ish line.

For example:
```
$ ./robot >25;12

Going to coordinates x=25;y=12
> 0;0
> 1;0
> 1;1
> 2;1
> 2;2
...
> 24;11
> 24;12
> 25;12
Destination reached!
```

# 2. List of destinations

Same as above, but the robot is given a list:
```
$ ./robot >0;5>-10;-5>0;0

Going to coordinates x=0;y=5
> 0;0
> 0;1
...
> 0;5
Destination 1 reached!

Going to coordinates x=-10;y=-5
> 0;5
> -1;5
> -1;4
...
> -9;-4
> -9;-5
> -10;-5
Destination reached!

...
```

The robot should always go back home (0;0) at the end.

# 3. Fuel

The robot should start with a full tank of 100L of fuel. It uses up 1L per move.

Once it runs out of fuel, it should stop moving, and the script should exit immediately.

# 4. Re-fuel

Let's make the robot a bit smarter.

The fuel station is positionned at the starting point (0;0).

When the robot is getting too far from the station, it should automatically go to refuel before running out of fuel.
It should also be aware of the fuel it will waste by going back to the station.

For example:
```
$ ./robot >20;20>20;-20>0;-10>40;40

Going to 20;20
// Using up 40L, 60L remaining

Going to 20;-20
// Would use 40L, 20L would be remaining.
// I wouldn't have enough fuel to go back to the station after that.
// So I go first to the station. then to 20;20
    Going to the station (0;0)
    // Using 40L, 20L remaining.
    // Re-fueling to 100L

    Going to 20;-20
    // Using 40L, 60L remaining

Going to 0;-10
// Using 30L, 30L remaining

Going to 40;40
// Impossible to go there, even if I pass by the station.
// I could reach it, but I wouldn't be able to go back to the base.
```

# 5. Sample weight

Each time the robot collects samples (meaning, each time it reaches a destination), it gets heavier. The heavier the robot is, the more fuel it consumes.

The initial weight of the robot is 5kg.
Each sample weighs 10kg.

The fuel consumption should follow a log10 curve, as follows:
```
Fuel per move = log10(weight);
```

The robot should be able to drop the samples anywhere on the map to retreive them later.

Find the best strategy to bring all the samples to the base, while using as little fuel as possible.
