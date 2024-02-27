function countdown(num: number, array: number[] = []) {
  if (num > 0) num = 0;

  array = [...array, Math.abs(num)];
  if (num >= 0) {
    return array;
  }

  return (offset = 0) => {
    num++;
    return countdown(num + offset, array);
  };
}

console.log(countdown(0));
console.log(countdown(1));
// @ts-ignore
console.log(countdown(-1)());
// @ts-ignore
console.log(countdown(-2)()());
// @ts-ignore
console.log(countdown(-10)(+5)()()()());
// @ts-ignore
console.log(countdown(-3)(-5)()(+2)(-1)()()());
