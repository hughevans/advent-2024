import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./05";

describe("Day 5", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/05/example.txt`).text();
    expect(partOne(input)).toEqual(143);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/05/example.txt`).text();
    expect(partTwo(input)).toEqual(123);
  });
});
