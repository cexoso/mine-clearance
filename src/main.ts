import "./style.css";
import { MineClearance } from "./core/mine-clearance";
import { createCanvasContainer } from "./canvas";
import { createDom } from './dom';
const mineClearance = new MineClearance({ row: 10, col: 10, mineCount: 9 });
mineClearance.randomMap();
const app = document.querySelector<HTMLDivElement>("#app")!;
const container = document.createElement("div");
container.className = "container";
container.append(createCanvasContainer(mineClearance));
container.append(createDom(mineClearance));
app.append(container);

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
