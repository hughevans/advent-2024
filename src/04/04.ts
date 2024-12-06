export function parse(input: string) {
  const rows = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  return { rows, numRows: rows.length, numColumns: rows[0].length };
}

export function partOne(input: string) {
  const { rows, numRows, numColumns } = parse(input);
  let words = [];

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numColumns; c++) {
      if (r < numRows - 3) {
        words.push(
          rows[r][c] + rows[r + 1][c] + rows[r + 2][c] + rows[r + 3][c]
        );

        if (c < numColumns - 3) {
          words.push(
            rows[r][c] +
              rows[r + 1][c + 1] +
              rows[r + 2][c + 2] +
              rows[r + 3][c + 3]
          );
        }

        if (c >= 3) {
          words.push(
            rows[r][c] +
              rows[r + 1][c - 1] +
              rows[r + 2][c - 2] +
              rows[r + 3][c - 3]
          );
        }
      }

      if (c < numColumns - 3) {
        words.push(
          rows[r][c] + rows[r][c + 1] + rows[r][c + 2] + rows[r][c + 3]
        );
      }
    }
  }

  const count = words.reduce((sum, word) => {
    if (word === "XMAS" || word === "SAMX") {
      return sum + 1;
    }

    return sum;
  }, 0);

  return count;
}

export function partTwo(input: string) {
  const { rows, numRows, numColumns } = parse(input);

  let words: [string, number[]][] = [];

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numColumns; c++) {
      if (r < numRows - 2) {
        if (c < numColumns - 2) {
          words.push([
            rows[r][c] + rows[r + 1][c + 1] + rows[r + 2][c + 2],
            [r + 1, c + 1],
          ]);
        }

        if (c >= 2) {
          words.push([
            rows[r][c] + rows[r + 1][c - 1] + rows[r + 2][c - 2],
            [r + 1, c - 1],
          ]);
        }
      }
    }
  }

  let xMap: Record<string, number> = {};

  words.forEach((word) => {
    if (word[0] === "MAS" || word[0] === "SAM") {
      const xKey = word[1].join("-");
      xMap[xKey] ? xMap[xKey]++ : (xMap[xKey] = 1);
    }
  });

  const count = Object.values(xMap).reduce((sum, xCount) => {
    return xCount === 2 ? sum + 1 : sum;
  }, 0);

  return count;
}
