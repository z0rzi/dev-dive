import Character from "./Character";
import Position from "./Position";
import Seed from "./Seed";
import store, { damagePlayer, levelUp, restoreHealth } from "./Store";

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

  reEnter(player: Character): void;
  enter(player: Character): void;
}

export class InitRoom implements Room {
  position: Position;

  constructor(position: Position) {
    this.position = position.clone();
  }

  reEnter() {
    console.log(`✨ You are back where you started.`);
  }

  enter() {
    console.log(
      "✨ You wake up in a dark dungeon. You have no idea where you are, but you have a feeling that you are not alone."
    );
  }
}

export class EmptyRoom implements Room {
  position: Position;

  constructor(position: Position) {
    this.position = position.clone();
  }
  reEnter(): void {
    console.log(
      "🍃 You enter in an empty room. It feels like you have been here before."
    );
  }

  enter() {
    console.log("🍃 You enter in an empty room. It's empty.");
  }
}

export class FoodRoom implements Room {
  position: Position;

  constructor(position: Position) {
    this.position = position.clone();
  }

  reEnter(): void {
    console.log("🍖 There is an empty plate on the floor.");
  }

  enter(player: Character) {
    console.log(
      "🍖 You enter in a room where you find a plate with food on it. You eat it. You feel better."
    );

    store.dispatch(restoreHealth(30));
  }
}

export class SwordRoom implements Room {
  position: Position;

  constructor(position: Position) {
    this.position = position.clone();
  }

  reEnter(): void {
    console.log("🔪 This is where you found your sword!");
  }

  enter() {
    console.log(
      "🔪 You enter in a room with a sword on the floor. You pick it up."
    );

    store.dispatch(levelUp());
    console.log("Your sword leveled up!");
  }
}

export class MonsterRoom implements Room {
  position: Position;
  monsterPower = 1;

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

  reEnter(player: Character): void {
    console.log(
      "👿 You see the corpse of the monster you killed on the floor. You feel a bit sad."
    );
  }

  enter(player: Character) {
    console.log("👿 A monster jumps from the shadows!");

    this.fightMonster(player);
  }

  fightMonster(player: Character) {
    const damage = this.calculateDamage(player);

    if (damage <= 0) {
      console.log("You killed the monster without taking any damage!");
      return;
    }

    store.dispatch(damagePlayer(damage));
    console.log(`The monster inflicts you ${damage} damage points\n`);
  }
}

export class BossRoom extends MonsterRoom {
  monsterPower = 2;

  reEnter(): void {
    console.log(
      "🐲 You see the corpse of the monster you killed on the floor. You feel a bit sad."
    );
  }

  enter(player: Character) {
    console.log("🐲 A giant monster jumps from the shadows!");

    this.fightMonster(player);
  }
}

export class FinalBossRoom extends MonsterRoom {
  monsterPower = 4;

  reEnter(): void {
    console.log("🧌 How did you come back here? The game is over!");
  }

  enter(player: Character) {
    console.log(
      "🧌 You feel the earth shaking. A giant monster appears in front of you!"
    );

    this.fightMonster(player);

    if (player.health > 0) {
      console.log("🏆 You defeated the final boss! You won the game!");
      process.exit(0);
    }
  }
}
