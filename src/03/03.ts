export function extractPairs(input: string) {
  const reg = /mul\((\d+\,\d+)\)/g;
  const matches = [...input.matchAll(reg)];

  return matches.map((match) => {
    return match[1].split(",").map((num) => parseInt(num));
  });
}

export function partOne(input: string) {
  const pairs = extractPairs(input);

  return pairs.reduce((sum, [a, b]) => sum + a * b, 0);
}

export function extractInstructions(input: string) {
  const matches = input.split("don't()");
  let enabledInstructions = "";

  matches.forEach((match, index) => {
    if (index === 0) {
      enabledInstructions += match;
      return;
    }

    const [, ...enabled] = match.split("do()");
    enabledInstructions += enabled.join("");
  });

  return enabledInstructions;
}

export function partTwo(input: string) {
  return partOne(extractInstructions(input));
}
