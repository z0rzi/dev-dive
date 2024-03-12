const sequence = process.argv[2];

console.log(sequence);

let x = 0;
let y = 0;

for (let i = 0; i < 1000; i++) {
  console.log("Robot is moving randomly");
  let xory = Math.random() > 0.5 ? "x" : "y";
  if (xory === "x") {
    x += Math.random() > 0.5 ? 1 : -1;
  } else {
    y += Math.random() > 0.5 ? 1 : -1;
  }
  console.log(`> ${x};${y}`);
}
