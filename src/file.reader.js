import fs from "fs";

class Constraint {
  constructor(r, c, v) {
    this.r = r;
    this.c = c;
    this.v = v;
  }
}

export default function read() {
  const constraints = [];
  fs.readFile("./input/sudoku_in.txt", "utf-8", (error, data) => {
    const assertions = data
      .toString()
      .split("\r\n")
      .filter((word) => !word == "");

    for (let i = 0; i < assertions.length; i++) {
      const start = assertions[i].indexOf("x");
      const row = parseInt(assertions[i].charAt(start + 1));
      const col = parseInt(assertions[i].charAt(start + 2));
      const val = parseInt(assertions[i].charAt(start + 4));
      const c = new Constraint(row, col, val);
      constraints.push(c);
    }
  });
  return constraints;
}
