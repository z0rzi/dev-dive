const STUCK_PROBABILITY = 0.1;

export async function fetchScatterPoints(): Promise<
  { x: number; y: number }[]
> {
  if (Math.random() < STUCK_PROBABILITY) {
    // I'm stuck!
    await new Promise((resolve) => setTimeout(resolve, 10000000000));
  }

  const result: { x: number; y: number }[] = [];
  for (let i = 0; i < 100; i++) {
    result.push({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    });
  }
  return result;
}

export async function fetchBarPoints(): Promise<[number, number][]> {
  if (Math.random() < STUCK_PROBABILITY) {
    // I'm stuck!
    await new Promise((resolve) => setTimeout(resolve, 10000000000));
  }

  const result: [number, number][] = [];
  for (let i = 0; i < 20; i++) {
    result.push([i, Math.random() * 1000]);
  }
  return result;
}

export async function fetchPiePoints(): Promise<number[]> {
  if (Math.random() < STUCK_PROBABILITY) {
    // I'm stuck!
    await new Promise((resolve) => setTimeout(resolve, 10000000000));
  }

  const result: number[] = [];
  for (let i = 0; i < 10; i++) {
    result.push(Math.random() * 1000);
  }
  return result;
}
