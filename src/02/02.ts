export function parse(input: string) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)));
}

function isReportSafe(levels: number[]) {
  let isSafe = true;
  const ascending = Math.sign(levels[0] - levels[1]);

  for (let j = 1; j < levels.length; j++) {
    const diff = levels[j - 1] - levels[j];

    if (
      Math.abs(diff) < 1 ||
      Math.abs(diff) > 3 ||
      Math.sign(diff) !== ascending
    ) {
      isSafe = false;
      break;
    }
  }

  return isSafe;
}

export function partOne(input: string) {
  return parse(input).reduce(
    (sum, levels) => sum + (isReportSafe(levels) ? 1 : 0),
    0
  );
}

export function partTwo(input: string) {
  return parse(input).reduce((sum, levels) => {
    for (let j = 0; j < levels.length; j++) {
      let newLevels = [...levels];
      newLevels.splice(j, 1);

      if (isReportSafe(newLevels)) {
        sum++;
        break;
      }
    }

    return sum;
  }, 0);
}
