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
    const mineClearance = new MineClearance({ row: 10, col: 20 });
    expect(mineClearance).has.property("randomMap");
    expect(mineClearance).has.property("createEmptyMap");
  });
  it("createEmptyMap will careate a map with value 0", () => {
    const mineClearance = new MineClearance({ row: 10, col: 20 });
    (mineClearance as any).createEmptyMap();
    const map = mineClearance.map;
    expect(map).lengthOf(10);
    expect(map.every((row) => row.length === 20)).eq(
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
        col: 20,
        mineCount: 200, // for detect random conflict
      });
      (mineClearance as any).createEmptyMap();
      (mineClearance as any).randomMime();
      const mineCount = getMineCountBymap(mineClearance.map);
      expect(mineCount).eq(200, "should have 200 mine");
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

  describe("setMine", () => {
    it("setMine can just only set mine data", () => {
      const mineClearance = new MineClearance({
        row: 10,
        col: 10,
        mineCount: -1,
      });
      (mineClearance as any).createEmptyMap();
      expect(mineClearance.isMine(1, 1)).not.eq(true, "should not be mine");
      mineClearance.setMine([
        { row: 1, col: 1 },
        { row: 5, col: 5 },
      ]);
      expect(mineClearance.isMine(1, 1)).eq(true, "should be mine");
      expect(mineClearance.isMine(5, 5)).eq(true, "should be mine");
    });
    it("setMine will also set cell value correctly, the value is the count of mines around", () => {
      const mineClearance = new MineClearance({ row: 3, col: 3 });
      (mineClearance as any).createEmptyMap();
      mineClearance.setMine([
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ]);
      // the result is
      const snapshot = mineClearance.getSnapshot();
      expect(snapshot[0]).deep.eq([-1, 3, 1], "第一行");
      expect(snapshot[1]).deep.eq([-1, -1, 1], "第二行");
      expect(snapshot[2]).deep.eq([2, 2, 1], "第三行");
    });
  });
});
