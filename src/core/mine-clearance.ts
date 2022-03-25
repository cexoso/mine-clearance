type Cell = {
  value: number; // -1 mean mien, 0~8 mean how much mines around the cell
};
export class MineClearance {
  constructor(public opts: { row?: number; col?: number; k?: number }) {}
  private map: Cell[][] = [];
  private createEmptyCell() {
    return {
      value: 0,
    };
  }
  private randomMime() {}

  private createEmptyMap() {
    this.map = [];
    const { row = 10, col = 10 } = this.opts;
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
    this.map = [];
  }
}
