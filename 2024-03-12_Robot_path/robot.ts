const sequence = process.argv[2] ?? "";

class Robot {
  x = 0;
  y = 0;
  fuel = 100;

  useFuel() {
    this.fuel--;

    if (this.x === 0 && this.y === 0) {
      this.fuel = 100;
    }

    if (this.fuel <= 0) {
      throw new Error("Out of fuel");
    }
  }

  /**
   * Goes to a given position in a straight-ish line
   */
  goTo(destX: number, destY: number) {
    let xDiff = Math.abs(destX - this.x);
    let yDiff = Math.abs(destY - this.y);

    /** How much fuel it will take me to get there? */
    const tripCost = xDiff + yDiff;

    /** How much fuel would it take me to go back to base once I get there? */
    const distanceToBase = Math.abs(destX) + Math.abs(destY);

    if (tripCost + distanceToBase > this.fuel) {
      // We go back to base
      this.goTo(0, 0);
    }

    let max = xDiff > yDiff ? xDiff : yDiff;

    let newX = this.x;
    let newY = this.y;

    const ratioX = (destX - this.x) / max;
    const ratioY = (destY - this.y) / max;

    for (let i = 0; i < max; i++) {
      newX += ratioX;
      newY += ratioY;

      if (Math.round(newX) !== this.x) {
        this.x = Math.round(newX);
        this.dumpPosition();
        this.useFuel();
      }

      if (Math.round(newY) !== this.y) {
        this.y = Math.round(newY);
        this.dumpPosition();
        this.useFuel();
      }
    }
  }

  dumpPosition() {
    console.log(`> ${this.x};${this.y}`);
  }
}

console.log(sequence);

const r = new Robot();

function drawStar() {
  r.goTo(0, 40);
  r.goTo(20, -35);
  r.goTo(-35, 10);
  r.goTo(35, 10);
  r.goTo(-20, -35);
  r.goTo(0, 40);
}

const destinations = sequence.split(">");

console.log(destinations);

destinations.shift();

for (const destination of destinations) {
  const [x, y] = destination.split(";");
  r.goTo(parseInt(x), parseInt(y));
}
