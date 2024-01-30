let cells = [];
let backCells = [];
const windowSize = 400;
const cellSize = 5;
let rows, cols;

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

  setCell(10, 10, ALIVE);
  setCell(11, 11, ALIVE);
  setCell(9, 12, ALIVE);
  setCell(10, 12, ALIVE);
  setCell(11, 12, ALIVE);
  flipBuffers();
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
let setCell = (x, y, value) => (backCells[x + cols * y] = value);

let updateCells = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      var nextState = getNextState(x, y);
      setCell(x, y, nextState);
    }
  }
};

let getNextState = (x, y) => {
  
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
}

let flipBuffers = () => {
  let temp = cells;
  cells = backCells;
  backCells = temp;
};
