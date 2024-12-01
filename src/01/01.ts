export function parse(input: string) {
  const lines = input.split("\n");
  const listOne: number[] = [];
  const listTwo: number[] = [];

  lines.forEach((line) => {
    let a, b;
    [a, b] = line.split("   ");
    if (a && b) {
      listOne.push(parseInt(a));
      listTwo.push(parseInt(b));
    }
  });

  return { listOne, listTwo };
}

export function sortArray(arr: number[]) {
  return arr.sort((a, b) => a - b);
}

export function partOne(input: string) {
  let { listOne, listTwo } = parse(input);
  listOne = sortArray(listOne);
  listTwo = sortArray(listTwo);

  let sum = 0;
  listOne.forEach((a, index) => {
    if (listTwo[index]) {
      sum += Math.abs(a - listTwo[index]);
    }
  });

  return sum;
}

export function partTwo(input: string) {
  let { listOne, listTwo } = parse(input);

  const score = listOne.reduce((aSum, a) => {
    const rowCount = listTwo.reduce((bSum, b) => {
      if (a === b) {
        return (bSum += 1);
      }
      return bSum;
    }, 0);
    return aSum + rowCount * a;
  }, 0);

  return score;
}
