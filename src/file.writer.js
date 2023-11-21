import { error } from "console";
import fs from "fs";

export default function write(content) {
  // overwrite content if such a file exists
  if (fs.existsSync("./output/sudoku_out.txt")) {
    fs.unlink("./output/sudoku_out.txt", (error) => {});
  }
  // write the content to the file
  fs.writeFile(
    "./output/sudoku_out.txt",
    content,
    { encoding: "ascii" },
    (error) => {}
  );
  console.log("Done!");
}
