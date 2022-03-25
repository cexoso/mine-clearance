import { expect } from "chai";
import { MineClearance } from "./mine-clearance";
const getEmptyCountBymap = (map: MineClearance["map"]) => {
  let mineCount = 0;
  for (let rows of map) {
    for (let cell of rows) {
      mineCount += cell.getValue().value === 0 ? 1 : 0;
    }
  }
  return mineCount;
};

const getMineCountBymap = (map: MineClearance["map"]) => {
  let mineCount = 0;
  for (let rows of map) {
    for (let cell of rows) {
      mineCount += cell.getValue().value === -1 ? 1 : 0;
    }
  }
  return mineCount;
};
describe("mineClearance", () => {
  it("method and property", () => {
    const mineClearance = new MineClearance({ row: 10, col: 10 });
    expect(mineClearance).has.property("randomMap");
    expect(mineClearance).has.property("createEmptyMap");
  });
  it("createEmptyMap will careate a map with value 0", () => {
    const mineClearance = new MineClearance({ row: 10, col: 10 });
    (mineClearance as any).createEmptyMap();
    const map = mineClearance.map;
    expect(map).lengthOf(10);
    expect(map.every((row) => row.length === 10)).eq(
      true,
      "all rows length is 10"
    );
    expect(
      map.every((row) => row.every((cell) => cell.getValue().value === 0))
    ).to.eq(true, "createEmptyMap will careate a map that all values are 0");
  });
  describe("randomMine", () => {
    it("randomMine will random mineCount mine in map", () => {
      const mineClearance = new MineClearance({
        row: 10,
        col: 10,
        mineCount: 100, // for detect random conflict
      });
      (mineClearance as any).createEmptyMap();
      (mineClearance as any).randomMime();
      const mineCount = getMineCountBymap(mineClearance.map);
      expect(mineCount).eq(100, "should have 100 mine");
    });
    it("mineCount too large", () => {
      const mineClearance = new MineClearance({
        row: 10,
        col: 10,
        mineCount: 101,
      });
      (mineClearance as any).createEmptyMap();
      expect(() => {
        (mineClearance as any).randomMime();
      }).to.throw();
    });
    it("mineCount too small", () => {
      const mineClearance = new MineClearance({
        row: 10,
        col: 10,
        mineCount: -1,
      });
      (mineClearance as any).createEmptyMap();
      expect(() => {
        (mineClearance as any).randomMime();
      }).to.throw();
    });
  });

  describe("randomMap", () => {
    const mineClearance = new MineClearance({ row: 10, col: 10 });
    mineClearance.randomMap();
    const emptyCount = getEmptyCountBymap(mineClearance.map);
    const mineCount = getMineCountBymap(mineClearance.map);
    
  });
});
