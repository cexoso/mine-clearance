import "./style.css";
import { MineClearance, Cell } from "./core/mine-clearance";
const mineClearance = new MineClearance({ row: 10, col: 10, mineCount: 9 });
mineClearance.randomMap()

const app = document.querySelector<HTMLDivElement>("#app")!;
const createCell = (cell: Cell, row: number, col: number) => {
  const div = document.createElement("div");
  div.addEventListener("click", () => {
    mineClearance.cleanCell(row, col);
  });
  cell.subscribe((value) => {
    if (value.visible) {
      div.innerText = String(value.value);
    } else {
      div.innerText = "";
    }
    const className = `cell ${value.visible ? "visible" : "hidden"} `;
    div.className = className;
  });
  return div;
};
mineClearance.map$.subscribe((map) => {
  const flagment = document.createDocumentFragment();
  for (let row = 0; row < map.length; row++) {
    const rowData = map[row];
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let col = 0; col < map.length; col++) {
      const cell = rowData[col];
      rowDiv.append(createCell(cell, row, col));
    }
    flagment.append(rowDiv);
  }
  app.append(flagment);
});
