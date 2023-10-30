export enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3,
}

export default class Position {
    x = 0;
    y = 0;

    toString() {
        return `${this.x}|${this.y}`;
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.North:
                this.y++;
                break;
            case Direction.East:
                this.x++;
                break;
            case Direction.South:
                this.y--;
                break;
            case Direction.West:
                this.x--;
                break;
        }
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
