import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./07";

describe("Day 7", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/07/example.txt`).text();
    expect(partOne(input)).toEqual(3749);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/07/example.txt`).text();
    expect(partTwo(input)).toEqual(11387);
  });
});
