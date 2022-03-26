import "./style.css";
import { MineClearance, Cell } from "./core/mine-clearance";
const mineClearance = new MineClearance({ row: 10, col: 10, mineCount: 9 });
mineClearance.randomMap();
const app = document.querySelector<HTMLDivElement>("#app")!;
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

const div = document.createElement("div");
div.className = "tips";
div.innerText =
  "click the cell to check whether is a mine, hold command key and click the cell will set or unset a flame on the cell";
app.append(div);

const button = document.createElement("button");

button.className = "start_button";
button.innerText = "start";
button.addEventListener("click", () => {
  mineClearance.randomMap();
});
app.append(button);

const status = document.createElement("div");
status.className = "status";
mineClearance.state$.subscribe((message) => {
  status.innerText = message;
});

app.append(status);
