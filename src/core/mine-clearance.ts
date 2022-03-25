type Cell = {
  value: number; // -1 mean mien, 0~8 mean how much mines around the cell
};
export class MineClearance {
  public getConfig = () => {
    const { row = 10, col = 10, mineCount = 9 } = this.opts;
    return {
      row,
      col,
      mineCount,
    };
  };
  constructor(
    public opts: { row?: number; col?: number; mineCount?: number }
  ) {}
  private map: Cell[][] = [];
  private createEmptyCell() {
    return {
      value: 0,
    };
  }
  private randomMime() {
    const { row, col, mineCount } = this.getConfig();
    const size = row * col;
    if (mineCount > size) {
      throw new Error("count of mine should less then map size");
    }
    if (mineCount < 0) {
      throw new Error("count of mine should greater or equeal 0");
    }

    // createRandomCache
    const randomCache = [];
    for (let i = 0; i < size; i++) {
      randomCache.push(i);
    }

    for (let i = 0; i < mineCount; i++) {
      // random mines
      const index = Math.floor(Math.random() * randomCache.length);
      const indexOfMine = randomCache[index];
      randomCache.splice(index, 1);
      const r = Math.floor(indexOfMine / row);
      const c = indexOfMine % row;
      this.map[r][c]!.value = -1; // mean mine
    }
  }
  private createEmptyMap() {
    this.map = [];
    const { row, col } = this.getConfig();
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      const row: Cell[] = [];
      for (let colIndex = 0; colIndex < col; colIndex++) {
        const cell: Cell = this.createEmptyCell();
        row.push(cell);
      }
      this.map.push(row);
    }
  }
  public randomMap() {
    this.createEmptyMap();
    this.randomMime();
  }
}
