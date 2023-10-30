import Position from "./Position";

export default class Seed {
  static _instance: Seed;
  static getInstance(): Seed {
    if (!Seed._instance) Seed._instance = new Seed();
    return Seed._instance;
  }

  private constructor() {}

  seed: number = 0;
  init(seed: string) {
    this.seed = parseInt(seed.slice(0, 10), 36);
  }

  /**
   * Makes a decision based on the current seed.
   *
   * @param type The type of decision to make (e.g. "trap", "monster", "item")
   * @param position The position where the decision is being made
   * @param opts The options for the decision
   *        - probabity: The probability of the decision being true
   *        - choices: An array of choices with their probabilities
   *        - probabity and choices are mutually exclusive
   *
   * @returns If probabity is provided, returns true if the decision is made, false otherwise
   *          If choices is provided, returns the choice that was made
   *
   * @throws If neither probabity nor choices is provided
   */
  choose<T = unknown>(
    type: string,
    position: Position | null,
    opts: {
      probabity: number;
    }
  ): boolean;
  choose<T = unknown>(
    type: string,
    position: Position | null,
    opts: {
      choices: [number, T][];
    }
  ): T;
  choose<T = unknown>(
    type: string,
    position: Position | null,
    opts: {
      probabity?: number;
      choices?: [number, T][];
    }
  ): boolean | T {
    const posStr = position?`${Math.abs(position.x)}${Math.abs(position.y)}`:"";
    const additionalSeed = parseInt(
      posStr + type.slice(0, 10),
      36
    );

    const num = (this.seed * additionalSeed) % 100;

    if (opts.probabity) {
      if (opts.probabity < 0 || opts.probabity > 1) {
        throw new Error("Probabity must be between 0 and 1");
      }
      return num > opts.probabity * 100;
    }
    if (opts.choices) {
      const total = opts.choices.reduce((acc, [prob]) => acc + prob, 0);
      let current = 0;
      for (const [prob, choice] of opts.choices) {
        current += prob;
        if (num < (current / total) * 100) {
          return choice;
        }
      }
    }
    throw new Error("Either probabity or choices must be provided");
  }

  generateNumber(type: string, position: Position | null, min: number, max: number): number {
    if (min >= max) return min;

    const posStr = position?`${Math.abs(position.x)}${Math.abs(position.y)}`:"";
    const additionalSeed = parseInt(
      posStr + type.slice(0, 10),
      36
    );

    return (this.seed * additionalSeed) % (max - min) + min;
  }
}
