import { error } from "console";
import fs from "fs";

export default function write(content) {
  if (fs.existsSync("./output/sudoku_out.txt")) {
    fs.unlink("./output/sudoku_out.txt", (error) => {});
  }
  fs.writeFile("./output/sudoku_out.txt", content, (error) => {});
  console.log("Done!");
}
