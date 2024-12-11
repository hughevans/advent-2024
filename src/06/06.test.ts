import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./06";

describe("Day 6", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/06/example.txt`).text();
    expect(partOne(input)).toEqual(41);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/06/example.txt`).text();
    expect(partTwo(input)).toEqual(6);
  });
});
