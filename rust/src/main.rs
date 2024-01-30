use eframe::egui::{self, TextureOptions};
mod life;

struct MyApp {
    grid: life::Grid,
    texture: Option<egui::TextureHandle>,
    cell_size: usize,
}
impl MyApp {
    fn draw_grid(&self, buffer: &mut Vec<u8>) {
        let grid_size = self.grid.size();
        let row_length = grid_size[0] * self.cell_size;
        for row in 0..grid_size[1] {
            let row_index = row * row_length * self.cell_size;
            for x in 0..row_length {
                // Draw horizontal lines
                buffer[x + row_index] = 0;
            }
            for row_offset in 1..self.cell_size {
                for column in 0..grid_size[0] {
                    // Draw vertical lines
                    buffer[column * self.cell_size + row_index + row_offset * row_length] = 0;
                    let state = self.grid.is_alive(column, row);
                    let color: u8 = if state { 200 } else { 50 };
                    for column_offset in 1..self.cell_size {
                        buffer[column * self.cell_size
                            + column_offset
                            + row_index
                            + row_offset * row_length] = color;
                    }
                }
            }
        }
    }
}

impl Default for MyApp {
    fn default() -> Self {
        let mut grid = life::Grid::default();
        grid.randomize();
        Self {
            grid: grid,
            texture: None,
            cell_size: 10,
        }
    }
}

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            let grid_size = self.grid.size();
            let texture_size = [grid_size[0] * self.cell_size, grid_size[1] * self.cell_size];
            let buffer_size = texture_size[0] * texture_size[1];

            let mut buffer: Vec<u8> = vec![255; buffer_size];

            self.draw_grid(&mut buffer);

            let image = egui::ColorImage::from_gray(texture_size, buffer.as_slice());
            let text_opts = TextureOptions::NEAREST;
            let texture: &egui::TextureHandle = self
                .texture
                .get_or_insert_with(|| ui.ctx().load_texture("image_name", image, text_opts));
            ui.image(texture);
        });
    }
}

fn main() {
    let options = eframe::NativeOptions::default();
    eframe::run_native(
        "Game of Life",
        options,
        Box::new(|_| Box::<MyApp>::default()),
    )
    .expect("App must run");
}
