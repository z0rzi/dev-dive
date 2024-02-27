
function max(array: number[]) {
    if (array.length === 1) return array[0];

    if (array[0] > array[1]) {
        array.splice(1, 1);
    } else {
        array.splice(0, 1);
    }

    return max(array);
}

const res = max([1, 5, 2, 75, 3, 83, 45, 53]);
console.log(res);
