import { describe, expect, test } from "bun:test";
import { partOne, partTwo } from "./03";

describe("Day 3", async () => {
  test("partOne", async () => {
    const input = await Bun.file(`./src/03/example.txt`).text();
    expect(partOne(input)).toEqual(161);
  });

  test("partTwo", async () => {
    const input = await Bun.file(`./src/03/example2.txt`).text();
    expect(partTwo(input)).toEqual(48);
  });
});
