export function parse(input: string) {
  const [rulesInput, pagesInput] = input.trim().split("\n\n");

  const rules = rulesInput
    .split("\n")
    .map((line) => line.split("|").map((rule) => parseInt(rule)));

  const updates = pagesInput
    .split("\n")
    .map((line) => line.split(",").map((rule) => parseInt(rule)));

  return { rules, updates };
}

export function partOne(input: string) {
  const { rules, updates } = parse(input);
  let validUpdates = [];

  for (let u = 0; u < updates.length; u++) {
    let applicableRules = [];

    for (let r = 0; r < rules.length; r++) {
      if (rules[r].every((rule) => updates[u].includes(rule))) {
        applicableRules.push(rules[r]);
      }
    }

    if (
      applicableRules.every((rule) => {
        return updates[u].indexOf(rule[0]) < updates[u].indexOf(rule[1]);
      })
    ) {
      validUpdates.push(updates[u]);
    }
  }

  const totalPages = validUpdates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0
  );

  return totalPages;
}

export function partTwo(input: string) {
  const { rules, updates } = parse(input);
  let invalidUpdates = [];

  for (let u = 0; u < updates.length; u++) {
    let applicableRules: number[][] = [];

    for (let r = 0; r < rules.length; r++) {
      if (rules[r].every((rule) => updates[u].includes(rule))) {
        applicableRules.push(rules[r]);
      }
    }

    if (
      !applicableRules.every((rule) => {
        return updates[u].indexOf(rule[0]) < updates[u].indexOf(rule[1]);
      })
    ) {
      let reorderedUpdate = [...updates[u]];

      reorderedUpdate.sort(function (x, y) {
        if (applicableRules.some((rule) => rule[0] === x && rule[1] === y)) {
          return -1;
        }

        if (applicableRules.some((rule) => rule[1] === x && rule[0] === y)) {
          return 1;
        }

        return 0;
      });

      invalidUpdates.push(reorderedUpdate);
    }
  }

  const totalPages = invalidUpdates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0
  );

  return totalPages;
}
