import keypress from "keypress";
import kleur from "kleur";

keypress(process.stdin);

import Map from "./Map";
import Position, { Direction } from "./Position";
import Seed from "./Seed";
import store, { PlayerState, getVisitedRooms, movePlayer, undo } from "./Store";

export default class Plot {
  seed = Seed.getInstance();
  map = new Map();

  get player(): PlayerState {
    return store.getState().game.player.present;
  }

  constructor() {
    this.loop();
  }

  async loop() {
    let undone = false;
    while (true) {
      console.clear();

      let pos = Object.assign(new Position(), this.currentPlayerPosition);
      const room = this.map.getRoom(pos);

      const visitedRooms = getVisitedRooms();

      const roomAlreadyVisited = undone || visitedRooms.some(
        (p) => p.x === pos.x && p.y === pos.y
      );

      if (roomAlreadyVisited) room.reEnter(this.player);
      else room.enter(this.player);

      this.drawPlayerInfos();

      if (this.player.health <= 0) {
        console.log("💀 You died 💀");
        break;
      }

      const direction = await this.promptDirection();

      if (direction === -1) {
        store.dispatch(undo());
        undone = true;
      } else {
        store.dispatch(movePlayer(direction));
        undone = false;
      }
    }
  }

  get currentPlayerPosition() {
    return store.getState().game.player.present.position;
  }

  drawPlayerInfos() {
    console.log();
    console.log(`🧭 ${this.player.movements.join(" ")}`);
    console.log(
      `📍 X: ${this.currentPlayerPosition.x} Y: ${this.currentPlayerPosition.y}`
    );
    console.log(`❤️  ${this.player.health}/100`);
    console.log(`🔪 Lv. ${this.player.swordLevel}`);
    console.log();
  }

  async promptDirection(): Promise<Direction> {
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

        resolve(direction);
      });
    });
  }
}
