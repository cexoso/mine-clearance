import { BehaviorSubject } from "rxjs";

export const flattenMap = <T>(
  table: T[][],
  callback: (v: T, row: number, col: number) => void
) => {
  for (let row = 0; row < table.length; row++) {
    const rowData = table[row];
    for (let col = 0; col < rowData.length; col++) {
      const value = rowData[col];
      callback(value, row, col);
    }
  }
};
export type Cell = BehaviorSubject<{
  value: number; // -1 mean mien, 0~8 mean how much mines around the cell
  visible: boolean;
}>;

export class MineClearance {
  public state$ = new BehaviorSubject<"fail" | "success" | "idle">("idle");
  public getConfig = () => {
    const { row = 10, col = 20, mineCount = 9 } = this.opts;
    return {
      row,
      col,
      mineCount,
    };
  };
  constructor(public opts: { row?: number; col?: number; mineCount?: number }) {
    this.map$ = this.createEmptyMap();
  }
  public map$: BehaviorSubject<Cell[][]>;
  public get map() {
    return this.map$.getValue();
  }
  public setMine(positions: { row: number; col: number }[]) {
    // only set mine without update ohter cell vale;
    const map = this.map;
    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const mine = this.createCell(-1);
      map[position.row][position.col].next(mine.getValue());
      this.increaseValueAroundMine(position.row, position.col);
    }
  }
  private increaseValueAroundMine(row: number, col: number) {
    this.getAroundValidCell(row, col).forEach(([r, c]) =>
      this.increaseValue(r, c)
    );
  }
  private increaseValue(row: number, col: number) {
    const map = this.map;
    const rowData = map[row];
    if (rowData === undefined) {
      return;
    }
    const cell = rowData[col];
    if (cell === undefined) {
      return;
    }
    const value = cell.getValue();
    if (value.value === -1) {
      // 是雷的话不处理
      return;
    }
    value.value += 1;
    cell.next(value);
  }
  private createCell(value: number = 0) {
    return new BehaviorSubject({
      value,
      visible: false,
    });
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
      const r = Math.floor(indexOfMine / col);
      const c = indexOfMine % col;
      this.map[r][c].getValue().value = -1; // mean mine
      this.increaseValueAroundMine(r, c);
    }
  }
  public isMine(row: number, col: number) {
    return this.map[row][col].getValue().value === -1;
  }
  private createEmptyMap() {
    const map: Cell[][] = [];
    // this.map$ = new BehaviorSubject
    const { row, col } = this.getConfig();
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      const row: Cell[] = [];
      for (let colIndex = 0; colIndex < col; colIndex++) {
        const cell: Cell = this.createCell();
        row.push(cell);
      }
      map.push(row);
    }
    return new BehaviorSubject(map);
  }
  public randomMap() {
    this.createEmptyMap();
    this.randomMime();
  }
  public getSnapshot() {
    return this.map.map((rows) => rows.map((cell) => cell.getValue().value));
  }
  public getVisibleSnapshot() {
    return this.map.map((rows) => rows.map((cell) => cell.getValue().visible));
  }
  public getAroundValidCell(row: number, col: number) {
    const { row: ConfigRow, col: ConfigCol } = this.getConfig();
    const aroundCell: [number, number][] = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];
    return aroundCell.filter(
      ([r, c]) => 0 <= r && r < ConfigRow && 0 <= c && c < ConfigCol
    );
  }
  public cleanCell(row: number, col: number) {
    const map = this.map;
    const value = map[row][col].getValue();
    if (value.visible) {
      return;
    }
    const result = this.expandAroundCell(row, col);
    if (result) {
      return;
    }
    this.state$.next("fail");
    this.showAllCell();
    return false;
  }

  showAllCell() {
    const map = this.map;
    flattenMap(map, (cell) => {
      cell.value.visible = true;
      cell.next(cell.value);
    });
  }

  private expandAroundCell(row: number, col: number) {
    const map = this.map;
    const cell = map[row][col];
    const value = cell.getValue();
    if (value.value === -1) {
      return false;
    }
    if (value.visible) {
      return true;
    }
    value.visible = true;
    cell.next(value);
    if (value.value === 0) {
      this.getAroundValidCell(row, col).forEach(([r, c]) => {
        this.expandAroundCell(r, c);
      });
    }
    return true;
  }
}
