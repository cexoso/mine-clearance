import { expect } from "chai";
import { MineClearance } from "./mine-clearance";

describe("mineClearance", () => {
  it("method and property", () => {
    const mineClearance = new MineClearance({ row: 10, col: 10 });
    expect(mineClearance).has.property("randomMap");
    expect(mineClearance).has.property("createEmptyMap");
  });
  it("createEmptyMap will careate a map with value 0", () => {
    const mineClearance = new MineClearance({ row: 10, col: 10 });
    (mineClearance as any).createEmptyMap();
    // console.log('debugger', mineClearance.map)
    const map: any[][] = (mineClearance as any).map;
    expect(map).lengthOf(10);
    expect(map.every((row) => row.length === 10)).eq(
      true,
      "all rows length is 10"
    );
    expect(map.every((row) => row.every((cell) => cell.value === 0))).to.eq(
      true,
      "createEmptyMap will careate a map that all values are 0"
    );
  });
  describe("randomMine", () => {
    it("randomMine will random K mine in map", () => {
      const mineClearance = new MineClearance({ row: 10, col: 10 });
      (mineClearance as any).createEmptyMap();
      // console.log('debugger', mineClearance.map)
      const map: any[][] = (mineClearance as any).map;
      expect(map).lengthOf(10);
      expect(map.every((row) => row.length === 10)).eq(
        true,
        "all rows length is 10"
      );
      expect(map.every((row) => row.every((cell) => cell.value === 0))).to.eq(
        true,
        "createEmptyMap will careate a map that all values are 0"
      );
    });
  });
});
