import Character from "./Character";
import Position from "./Position";
import Seed from "./Seed";

export enum RoomType {
  Init,
  Empty,
  Sword,
  Enemy,
  Food,
  Boss,
  FinalBoss,
}

export function getRoomType(room: Room): RoomType {
  if (room instanceof InitRoom) return RoomType.Init;
  if (room instanceof EmptyRoom) return RoomType.Empty;
  if (room instanceof SwordRoom) return RoomType.Sword;
  if (room instanceof FoodRoom) return RoomType.Food;
  if (room instanceof FinalBossRoom) return RoomType.FinalBoss;
  if (room instanceof BossRoom) return RoomType.Boss;
  if (room instanceof MonsterRoom) return RoomType.Enemy;
  throw new Error("Unknown room type");
}

export default interface Room {
  position: Position;
  visited: boolean;
  enterMessage: string;

  enter(player: Character): void;
}

export class InitRoom implements Room {
  position: Position;
  visited = false;

  get enterMessage() {
    if (this.visited) {
      return `✨ You are back where you started.`;
    }
    return `✨ You wake up in a dark dungeon. You have no idea where you are, but you have a feeling that you are not alone.`;
  }

  constructor(position: Position) {
    this.position = position.clone();
  }

  enter() {
    console.log(this.enterMessage);
  }
}

export class EmptyRoom implements Room {
  position: Position;
  visited = false;

  get enterMessage() {
    if (this.visited) {
      return "🍃 You enter in an empty room. It feels like you have been here before.";
    }
    return "🍃 You enter in an empty room. It's empty.";
  }

  constructor(position: Position) {
    this.position = position.clone();
  }

  enter() {
    console.log(this.enterMessage);
  }
}

export class FoodRoom implements Room {
  position: Position;
  visited = false;

  get enterMessage() {
    if (this.visited) {
      return "🍖 There is an empty plate on the floor.";
    }
    return "🍖 You enter in a room where you find a plate with food on it. You eat it. You feel better.";
  }

  constructor(position: Position) {
    this.position = position.clone();
  }

  enter(player: Character) {
    console.log(this.enterMessage);

    if (this.visited) return;

    player.health += 30;
    if (player.health > 100) player.health = 100;
  }
}

export class SwordRoom implements Room {
  position: Position;
  visited = false;

  get enterMessage() {
    if (this.visited) {
      return "🔪 This is where you found your sword!";
    }
    return "🔪 You enter in a room with a sword on the floor. You pick it up.";
  }

  constructor(position: Position) {
    this.position = position.clone();
  }

  enter(player: Character) {
    console.log(this.enterMessage);
    if (this.visited) return;

    player.swordLevel += 1;
    console.log("Your sword leveled up!");
  }
}

export class MonsterRoom implements Room {
  position: Position;
  visited = false;
  monsterPower = 1;

  get enterMessage(): string {
    if (this.visited) {
      return "👿 You see the corpse of the monster you killed on the floor. You feel a bit sad.";
    }
    return "👿 A monster jumps from the shadows!";
  }

  constructor(position: Position) {
    this.position = position.clone();
  }

  calculateDamage(player: Character) {
    const seed = Seed.getInstance();

    let minDamage = (this.monsterPower * 2 - player.swordLevel) * 10;
    if (minDamage < 0) minDamage = 0;
    const maxDamage = minDamage + 20;

    const damage = seed.generateNumber(
      "monster-damage",
      this.position,
      minDamage,
      maxDamage
    );

    return damage;
  }

  enter(player: Character) {
    console.log(this.enterMessage);
    if (this.visited) return;

    this.fightMonster(player);
  }

  fightMonster(player: Character) {
    const damage = this.calculateDamage(player);

    if (damage <= 0) {
      console.log("You killed the monster without taking any damage!");
      return;
    }

    player.health -= damage;
    console.log(`The monster inflicts you ${damage} damage points\n`);
  }
}

export class BossRoom extends MonsterRoom {
  monsterPower = 2;

  get enterMessage(): string {
    if (this.visited) {
      return "🐲 You see the corpse of the monster you killed on the floor. You feel a bit sad.";
    }
    return "🐲 A giant monster jumps from the shadows!";
  }
}

export class FinalBossRoom extends MonsterRoom {
  monsterPower = 4;

  get enterMessage(): string {
    if (this.visited) {
      return "🧌 How did you come back here? The game is over!";
    }
    return "🧌 You feel the earth shaking. A giant monster appears in front of you!";
  }

  enter(player: Character) {
    console.log(this.enterMessage);

    this.fightMonster(player);

    if (player.health > 0) {
      console.log("🏆 You defeated the final boss! You won the game!");
      process.exit(0);
    }
  }
}
