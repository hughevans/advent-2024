interface Data {
  listOne: number[];
  listTwo: number[];
}

export function parse(input: string) {
  const lines = input.split("\n");

  let data: Data = {
    listOne: [],
    listTwo: [],
  };

  lines.forEach((line) => {
    let a, b;
    [a, b] = line.split("   ");

    if (a && b) {
      data.listOne.push(parseInt(a));
      data.listTwo.push(parseInt(b));
    }
  });

  return data;
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

  const score = listOne.reduce((runningSum, a) => {
    const rowCount = listTwo.reduce((instanceCount, b) => {
      if (a === b) {
        return (instanceCount += 1);
      }
      return instanceCount;
    }, 0);
    return runningSum + rowCount * a;
  }, 0);

  return score;
}
