import type { MineClearance, Cell } from "./core/mine-clearance";
const devicePixelRatio = window.devicePixelRatio || 1;
const fontSize = 16 * devicePixelRatio;
export const createCanvasContainer = (mineClearance: MineClearance) => {
  const container = document.createElement("canvas");

  container.className = "canvas";
  container.width = 520 * devicePixelRatio;
  container.height = 520 * devicePixelRatio;
  const ctx = container.getContext("2d")!;
  ctx.fillStyle = "#605a22";
  const createCell = (cell: Cell, row: number, col: number) => {
    const startX = (52 * col + 1) * devicePixelRatio;
    const startY = (52 * row + 1) * devicePixelRatio;

    ctx.font = `${fontSize}px Avenir, Helvetica, Arial, sans-serif`;
    cell.subscribe((value) => {
      ctx.fillRect(
        startX,
        startY,
        50 * devicePixelRatio,
        50 * devicePixelRatio
      );
      const drawText = (text: string) => {
        ctx.save();
        ctx.fillStyle = "#a2a8db";
        ctx.textAlign = "center";
        ctx.fillText(
          text,
          startX + 25 * devicePixelRatio,
          startY + 25 * devicePixelRatio + fontSize / 2
        );
        ctx.restore();
      };
      if (value.visible) {
        drawText(value.value === -1 ? "*" : String(value.value));
      } else if (value.hasFlag) {
        drawText("F");
      }
    });
  };

  container.addEventListener("click", (event) => {
    const col = Math.floor(event.offsetX / 52);
    const row = Math.floor(event.offsetY / 52);
    if (event.metaKey) {
      mineClearance.setFlag(row, col);
    } else {
      mineClearance.cleanCell(row, col);
    }
  });
  mineClearance.map$.subscribe((map) => {
    for (let row = 0; row < map.length; row++) {
      const rowData = map[row];
      for (let col = 0; col < map.length; col++) {
        const cell = rowData[col];
        createCell(cell, row, col);
      }
    }
  });
  return container;
};
