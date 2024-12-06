import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./04";

describe("Day 4", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/04/example.txt`).text();
    expect(partOne(input)).toEqual(18);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/04/example.txt`).text();
    expect(partTwo(input)).toEqual(9);
  });
});
