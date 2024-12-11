export function parse(input: string) {
  let startPosition: [number, number] = [0, 0];

  const obstructions = input
    .trim()
    .split("\n")
    .map((line, row) =>
      line.split("").map((char, col) => {
        if (char === "^") {
          startPosition = [row, col];
        }
        return char === "#";
      })
    );

  return { obstructions, startPosition };
}

export function partOne(input: string) {
  const { obstructions, startPosition } = parse(input);
  const patrol = extractPatrol(obstructions, startPosition);

  const uniquePoints = Array.from(
    new Map(patrol.map((p) => [[p[0], p[1]].join(), p])).values()
  );

  return uniquePoints.length;
}

export function partTwo(input: string) {
  const { obstructions, startPosition } = parse(input);
  const patrol = extractPatrol(obstructions, startPosition);
  let loops: number[][] = [];

  for (let i = 0; i < patrol.length - 1; i++) {
    let modifiedObstructions = structuredClone(obstructions);
    modifiedObstructions[patrol[i + 1][0]][patrol[i + 1][1]] = true;
    let [row, column, direction] = patrol[i];

    let modifiedPatrol = extractPatrol(
      modifiedObstructions,
      [row, column],
      direction
    );

    const [firstRow, firstColumn] = modifiedPatrol[0];
    const [lastRow, lastColumn] = modifiedPatrol[modifiedPatrol.length - 1];

    if (
      modifiedPatrol.length > 1 &&
      firstRow === lastRow &&
      firstColumn === lastColumn
    ) {
      console.log(patrol[i + 1]);
      loops.push([firstRow, firstColumn]);
    }
  }

  const uniquePoints = Array.from(
    new Map(loops.map((p) => [[p[0], p[1]].join(), p])).values()
  );

  return uniquePoints.length;
}

function isObstructed(obstructions: boolean[][], position: number[]) {
  return obstructions[position[0]][position[1]];
}

function isOffGrid(obstructions: boolean[][], position: number[]) {
  return (
    position[0] < 0 ||
    position[1] < 0 ||
    position[0] >= obstructions[0].length ||
    position[1] >= obstructions.length
  );
}

function extractPatrol(
  obstructions: boolean[][],
  startPosition: [number, number],
  startDirection = "up"
) {
  let patrol: [number, number, string][] = [[...startPosition, startDirection]];
  let direction = startDirection;
  let onGrid = true;
  let inLoop = false;

  while (onGrid && !inLoop) {
    let latestPosition = patrol[patrol.length - 1];

    if (direction === "up") {
      let nextPosition: [number, number] = [
        latestPosition[0] - 1,
        latestPosition[1],
      ];

      if (isOffGrid(obstructions, nextPosition)) {
        onGrid = false;
      } else if (isObstructed(obstructions, nextPosition)) {
        direction = "right";
      } else {
        patrol.push([...nextPosition, direction]);
      }
    } else if (direction === "right") {
      let nextPosition: [number, number] = [
        latestPosition[0],
        latestPosition[1] + 1,
      ];

      if (isOffGrid(obstructions, nextPosition)) {
        onGrid = false;
      } else if (isObstructed(obstructions, nextPosition)) {
        direction = "down";
      } else {
        patrol.push([...nextPosition, direction]);
      }
    } else if (direction === "down") {
      let nextPosition: [number, number] = [
        latestPosition[0] + 1,
        latestPosition[1],
      ];

      if (isOffGrid(obstructions, nextPosition)) {
        onGrid = false;
      } else if (isObstructed(obstructions, nextPosition)) {
        direction = "left";
      } else {
        patrol.push([...nextPosition, direction]);
      }
    } else if (direction === "left") {
      let nextPosition: [number, number] = [
        latestPosition[0],
        latestPosition[1] - 1,
      ];

      if (isOffGrid(obstructions, nextPosition)) {
        onGrid = false;
      } else if (isObstructed(obstructions, nextPosition)) {
        direction = "up";
      } else {
        patrol.push([...nextPosition, direction]);
      }
    }

    latestPosition = patrol[patrol.length - 1];

    if (
      patrol.length > 1 &&
      patrol
        .slice(0, patrol.length - 1)
        .some(
          (pos) =>
            pos[0] === latestPosition[0] &&
            pos[1] === latestPosition[1] &&
            pos[2] === latestPosition[2]
        )
    ) {
      inLoop = true;
    }
  }

  return patrol;
}
