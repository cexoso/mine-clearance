import type { MineClearance, Cell } from "./core/mine-clearance";

export const createDom = (mineClearance: MineClearance) => {
  const createCell = (cell: Cell, row: number, col: number) => {
    const div = document.createElement("div");
    div.addEventListener("click", (event) => {
      if (event.metaKey) {
        mineClearance.setFlag(row, col);
      } else {
        mineClearance.cleanCell(row, col);
      }
    });
    cell.subscribe((value) => {
      if (value.visible) {
        div.innerText = value.value === -1 ? "*" : String(value.value);
      } else if (value.hasFlag) {
        div.innerText = "F";
      } else {
        div.innerText = "";
      }
      const className = `cell ${value.visible ? "visible" : "hidden"} `;
      div.className = className;
    });
    return div;
  };
  const dom = document.createElement("div");
  dom.className = "dom";
  mineClearance.map$.subscribe((map) => {
    for (let row = 0; row < map.length; row++) {
      const rowData = map[row];
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      for (let col = 0; col < map.length; col++) {
        const cell = rowData[col];
        rowDiv.append(createCell(cell, row, col));
      }
      dom.append(rowDiv);
    }
  });
  return dom;
};
