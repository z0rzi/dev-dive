import Position from "./Position";
import Room, {
  BossRoom,
  EmptyRoom,
  FinalBossRoom,
  FoodRoom,
  InitRoom,
  MonsterRoom,
  RoomType,
  SwordRoom,
  getRoomType,
} from "./Room";
import Seed from "./Seed";

export default class Map {
  seed = Seed.getInstance();

  visitedRooms = [] as Room[];

  constructor() {}

  getRoom(pos: Position) {
    const room = this.visitedRooms.find((room) => room.position.sameAs(pos));

    if (room) return room;

    return this.generateNewRoom(pos);
  }

  countVisitedRooms(type: RoomType) {
    return this.visitedRooms.filter((room) => {
      return getRoomType(room) === type;
    }).length;
  }

  generateNewRoom(pos: Position) {
    if (this.visitedRooms.length === 0) {
      const room = new InitRoom(pos);
      this.visitedRooms.push(room);
      return room;
    }

    let bossChance = 5;
    let finalBossChance = 5;
    let swordChance = 5;

    const visitedEnemyAmount = this.countVisitedRooms(RoomType.Enemy);
    const swordsFound = this.countVisitedRooms(RoomType.Sword);
    const visitedBossesAmount = this.countVisitedRooms(RoomType.Boss);

    if (!swordsFound) {
      swordChance = 5;
    } else {
      swordChance = 5 - swordsFound * 2;
      if (swordChance < 1) swordChance = 1;
    }

    if (visitedEnemyAmount === 0) {
      bossChance = 0;
    } else {
      bossChance = 5 + visitedEnemyAmount * 2;
    }

    if (visitedBossesAmount === 0 || swordsFound < 2) {
      finalBossChance = 0;
    } else {
      finalBossChance = 5 + visitedBossesAmount * 5;
    }

    const roomType = this.seed.choose("room", pos, {
      choices: [
        [10, RoomType.Empty],
        [5, RoomType.Enemy],
        [5, RoomType.Food],
        [swordChance, RoomType.Sword],
        [bossChance, RoomType.Boss],
        [finalBossChance, RoomType.FinalBoss],
      ],
    });

    let room: Room;

    switch (roomType) {
      case RoomType.Init:
        room = new InitRoom(pos);
        break;
      case RoomType.Empty:
        room = new EmptyRoom(pos);
        break;
      case RoomType.Sword:
        room = new SwordRoom(pos);
        break;
      case RoomType.Food:
        room = new FoodRoom(pos);
        break;
      case RoomType.Enemy:
        room = new MonsterRoom(pos);
        break;
      case RoomType.Boss:
        room = new BossRoom(pos);
        break;
      case RoomType.FinalBoss:
        room = new FinalBossRoom(pos);
        break;
      default:
        throw new Error("Unknown room type");
    }

    this.visitedRooms.push(room);
    return room;
  }
}
