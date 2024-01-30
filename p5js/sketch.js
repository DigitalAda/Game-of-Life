let cells = [];
let backCells = [];
const windowSize = 900;
const cellSize = 10;
let rows, cols;

const FRAME_RATE = 60;
const ALIVE = true;
const DEAD = false;

function setup() {
  createCanvas(windowSize, windowSize);
  rows = windowSize / cellSize;
  cols = windowSize / cellSize;
  for (let index = 0; index < rows * cols; index++) {
    cells.push(DEAD);
    backCells.push(DEAD);
  }
  addStuff();
  flipBuffers();
  frameRate(FRAME_RATE);
}

function draw() {
  background(220);
  noStroke();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = getCell(x, y);
      if (cell === ALIVE) {
        fill(50);
      } else {
        fill(200);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  updateCells();
  flipBuffers();
}

let getCell = (x, y) => {
  x = (x + rows) % rows;
  y = (y + cols) % cols;
  return cells[x + cols * y];
};
let setCell = (x, y, value) => {
  x = (x + rows) % rows;
  y = (y + cols) % cols;
  return (backCells[x + cols * y] = value);
};

let updateCells = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      var nextState = getNextState(x, y);
      setCell(x, y, nextState);
    }
  }
};

let getNextState = (x, y) => {
  neightbourCount = countNegighbours(x, y);
  if (getCell(x, y) === ALIVE) {
    neightbourCount--;
    if (neightbourCount === 2 || neightbourCount === 3) {
      return ALIVE;
    } else {
      return DEAD;
    }
  } else {
    if (neightbourCount === 3) {
      return ALIVE;
    } else {
      return DEAD;
    }
  }
};

let countNegighbours = (x, y) => {
  let neightbourCount = 0;
  for (let yOff = -1; yOff <= 1; yOff++) {
    for (let xOff = -1; xOff <= 1; xOff++) {
      let cell = getCell(x + xOff, y + yOff);
      if (cell === ALIVE) {
        neightbourCount++;
      }
    }
  }
  return neightbourCount;
};

let flipBuffers = () => {
  let temp = cells;
  cells = backCells;
  backCells = temp;
};

let addStuff = () => {
  let center = { x: rows / 2, y: cols / 2 };
  let corner = { x: center.x + rows / 3, y: center.y + cols / 3 };

  glider(corner.x - 5, corner.y - 5);
  glider(corner.x + 5, corner.y - 5);
  glider(corner.x + 5, corner.y + 5);
  glider(corner.x - 5, corner.y + 5);

  glider(-corner.x - 5, -corner.y - 5);
  glider(-corner.x + 5, -corner.y - 5);
  glider(-corner.x + 5, -corner.y + 5);
  glider(-corner.x - 5, -corner.y + 5);

  glider(center.x - 5, center.y - 5);
  glider(center.x + 5, center.y - 5);
  glider(center.x + 5, center.y + 5);
  glider(center.x - 5, center.y + 5);

  blinker(-10, 10);
  blinker(-20, 10);
  blinker(-20, 20);
  blinker(-10, 20);
  blinker(10, -10);
  blinker(20, -10);
  blinker(20, -20);
  blinker(10, -20);
  pentadecathlon(rows / 2, -20);
  pentadecathlon(rows / 2, +20);
  pentadecathlon(-20, cols / 2);
  pentadecathlon(+20, cols / 2);
};

let glider = (x, y) => {
  setCell(x - 1, y + 0, ALIVE);
  setCell(x - 0, y + 1, ALIVE);
  setCell(x + 1, y - 1, ALIVE);
  setCell(x + 1, y + 0, ALIVE);
  setCell(x + 1, y + 1, ALIVE);
};

let blinker = (x, y) => {
  setCell(x - 1, y, ALIVE);
  setCell(x + 0, y, ALIVE);
  setCell(x + 1, y, ALIVE);
};

let pentadecathlon = (x, y) => {
  setCell(x + 0, y - 5, ALIVE);
  setCell(x + 0, y - 4, ALIVE);
  setCell(x - 1, y - 3, ALIVE);
  setCell(x + 1, y - 3, ALIVE);
  setCell(x + 0, y - 2, ALIVE);
  setCell(x + 0, y - 1, ALIVE);
  setCell(x + 0, y + 0, ALIVE);
  setCell(x + 0, y + 1, ALIVE);
  setCell(x - 1, y + 2, ALIVE);
  setCell(x + 1, y + 2, ALIVE);
  setCell(x + 0, y + 3, ALIVE);
  setCell(x + 0, y + 4, ALIVE);
};
