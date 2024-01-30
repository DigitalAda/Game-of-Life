const DEFAULT_ROWS: usize = 50;
const DEFAULT_COLUMNS: usize = 50;

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
    pub fn size(&self) -> [usize; 2] {
        return [self.rows, self.columns];
    }

    pub fn randomize(&mut self) {
        let size = self.rows * self.columns;
        for i in 0..size {
            self.cells[i] = Cell::random()
        }
    }

    pub(crate) fn is_alive(&self, x: usize, y: usize) -> bool {
        self.cells[x + self.rows * y].alive
    }
}
