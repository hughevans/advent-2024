export function parse(input: string) {
  const rows: [number, number[]][] = input
    .trim()
    .split("\n")
    .map((line) => {
      const [total, rest] = line.split(": ");
      const numbers = rest.split(" ").map((n) => parseInt(n));

      return [parseInt(total), numbers];
    });

  return rows;
}

export function partOne(input: string) {
  const rows = parse(input);

  const correctRows = rows.filter(([total, numbers]) => {
    return findMatch(total, numbers[0], numbers.slice(1));
  });

  return correctRows.reduce((acc, [total, numbers]) => {
    acc += total;
    return acc;
  }, 0);
}

function findMatch(total: number, acc: number, rest: number[]): boolean {
  if (rest.length === 1) {
    if (acc + rest[0] === total) {
      return true;
    }

    if (acc * rest[0] === total) {
      return true;
    }

    return false;
  }

  return (
    findMatch(total, acc + rest[0], rest.slice(1)) ||
    findMatch(total, acc * rest[0], rest.slice(1))
  );
}

export function partTwo(input: string) {
  const rows = parse(input);

  const correctRows = rows.filter(([total, numbers]) => {
    return findMatchTwo(total, numbers[0], numbers.slice(1));
  });

  return correctRows.reduce((acc, [total, numbers]) => {
    acc += total;
    return acc;
  }, 0);
}

function findMatchTwo(total: number, acc: number, rest: number[]): boolean {
  if (rest.length === 1) {
    if (acc + rest[0] === total) {
      return true;
    }

    if (acc * rest[0] === total) {
      return true;
    }

    if (parseInt(acc.toString() + rest[0].toString()) === total) {
      return true;
    }

    return false;
  }

  return (
    findMatchTwo(total, acc + rest[0], rest.slice(1)) ||
    findMatchTwo(total, acc * rest[0], rest.slice(1)) ||
    findMatchTwo(
      total,
      parseInt(acc.toString() + rest[0].toString()),
      rest.slice(1)
    )
  );
}
