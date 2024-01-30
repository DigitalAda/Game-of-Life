const DEFAULT_ROWS: usize = 50;
const DEFAULT_COLUMNS: usize = 50;
const NEIGHBOUR_POSITIONS: [(i32, i32); 8] = [
    (-1, -1),
    (0, -1),
    (1, -1),
    (-1, 0),
    (1, 0),
    (-1, 1),
    (0, 1),
    (1, 1),
];

#[derive(Clone)]
struct Cell {
    alive: bool,
}
impl Cell {
    fn random() -> Cell {
        Cell {
            alive: rand::random(),
        }
    }
}

pub struct Grid {
    rows: usize,
    columns: usize,
    cells: Vec<Cell>,
}

impl Default for Grid {
    fn default() -> Self {
        Self {
            rows: DEFAULT_ROWS,
            columns: DEFAULT_COLUMNS,
            cells: vec![Cell { alive: false }; DEFAULT_ROWS * DEFAULT_COLUMNS],
        }
    }
}

impl Grid {
    pub(crate) fn size(&self) -> [usize; 2] {
        return [self.rows, self.columns];
    }

    pub(crate) fn randomize(&mut self) {
        let size = self.rows * self.columns;
        for i in 0..size {
            self.cells[i] = Cell::random()
        }
    }

    pub(crate) fn is_alive(&self, x: i32, y: i32) -> bool {
        let x_ = ((x + self.rows as i32) % self.rows as i32) as usize;
        let y_ = ((y + self.columns as i32) % self.columns as i32) as usize;
        self.cells[x_ + self.rows * y_].alive
    }

    pub(crate) fn next_grid(&self) -> Grid {
        let mut new_cells = vec![Cell { alive: false }; DEFAULT_ROWS * DEFAULT_COLUMNS];

        for column in 0..self.columns {
            for row in 0..self.rows {
                new_cells[row + column * self.rows] = self.next_state(row, column)
            }
        }

        let mut newGrid = Grid {
            rows: self.rows,
            columns: self.columns,
            cells: new_cells,
        };
        newGrid.randomize();
        return newGrid;
    }

    fn next_state(&self, row: usize, column: usize) -> Cell {
        let neighbours = self.count_neighbours(row, column);
        if self.is_alive(row as i32, column as i32) {
            Cell {
                alive: neighbours == 2 || neighbours == 3,
            }
        } else {
            Cell {
                alive: neighbours == 3,
            }
        }
    }

    fn count_neighbours(&self, row: usize, column: usize) -> i32 {
        NEIGHBOUR_POSITIONS
            .map(|pos| (row as i32 + pos.0, column as i32 + pos.1))
            .iter()
            .fold(0, |acc, pos| {
                acc + (if self.is_alive(pos.0, pos.1) { 1 } else { 0 })
            })
    }
}
