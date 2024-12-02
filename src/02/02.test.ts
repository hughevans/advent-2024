import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./02";

describe("Day 2", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/02/example.txt`).text();
    expect(partOne(input)).toEqual(2);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/02/example.txt`).text();
    expect(partTwo(input)).toEqual(4);
  });
});
