import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./01";

describe("Day 1", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/01/example.txt`).text();
    expect(partOne(input)).toEqual(11);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/01/example.txt`).text();
    expect(partTwo(input)).toEqual(31);
  });
});
