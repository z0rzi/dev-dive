export enum Direction {
  BackinTime = -1,
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export const DirectionDelta = {
  [Direction.North]: { x: 0, y: -1 },
  [Direction.South]: { x: 0, y: 1 },
  [Direction.West]: { x: -1, y: 0 },
  [Direction.East]: { x: 1, y: 0 },
  [Direction.BackinTime]: { x: 0, y: 0 },
};

export default class Position {
  x = 0;
  y = 0;

  toString() {
    return `${this.x}|${this.y}`;
  }

  move(direction: Direction) {
    const delta = DirectionDelta[direction];
    this.x += delta.x;
    this.y += delta.y;
  }

  sameAs(pos: Position) {
    return this.x === pos.x && this.y === pos.y;
  }

  clone() {
    const pos = new Position();
    pos.x = this.x;
    pos.y = this.y;
    return pos;
  }
}
