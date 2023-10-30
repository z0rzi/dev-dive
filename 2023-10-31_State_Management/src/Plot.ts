import keypress from "keypress";
import kleur from "kleur";

keypress(process.stdin);

import Map from "./Map";
import Position, { Direction } from "./Position";
import Seed from "./Seed";
import Character from "./Character";

export default class Plot {
  seed = Seed.getInstance();
  map = new Map();
  position = new Position();
  movements = [] as string[];

  character: Character = {
    health: 100,
    swordLevel: 0,
  };

  constructor() {
    this.loop();
  }

  async loop() {
    while (true) {
      this.drawPlayerInfos();

      const room = this.map.getRoom(this.position);

      room.enter(this.character);
      room.visited = true;

      if (this.character.health <= 0) {
        console.log("💀 You died 💀");
        break;
      }

      await this.promptDirection();
    }
  }

  drawPlayerInfos() {
    console.clear();
    console.log(`🧭 ${this.movements.join(" ")}`);
    console.log(`📍 X: ${this.position.x} Y: ${this.position.y}`);
    console.log(`❤️  ${this.character.health}/100`);
    console.log(`🔪 Lv. ${this.character.swordLevel}`);
    console.log();
  }

  async promptDirection(): Promise<void> {
    // listen for the "keypress" event
    return new Promise((resolve) => {
      console.log(
        "\nWhere do you want to go? " +
          kleur.gray("(Use arrow keys to move, backspace to go back in time)")
      );
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("keypress", (_, key) => {
        process.stdin.pause();

        const direction = {
          up: Direction.North,
          down: Direction.South,
          left: Direction.West,
          right: Direction.East,
          backspace: -1,
        }[key.name as string];

        if (direction == null) {
          // No direction was provided, we exit...
          console.log("No direction provided, exiting...\n");
          process.exit(1);
        }

        if (direction === -1) {
          console.log("Time travel is not implemented yet...\n");
          setTimeout(() => {
            // Adding a timeout to leavt the time for stdin to pause
            resolve(this.promptDirection());
          });
          return;
        }

        this.movements.push(Direction[direction].charAt(0));

        this.position.move(direction);
        console.log(`You move ${Direction[direction]}\n`);
        resolve();
      });
    });
  }
}
