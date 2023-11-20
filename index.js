import { init } from "z3-solver";
import read from "./src/file.reader.js";
import write from "./src/file.writer.js";

const sab = new SharedArrayBuffer(1024);
const { Context } = await init();
const { Solver, Int, And, Distinct } = new Context("main");

const solver = new Solver();

const cells = [];

// initialize 9x9 matrix of integer variables
for (let r = 0; r < 9; r++) {
  const row = [];
  for (let c = 0; c < 9; c++) {
    row.push(Int.const(`x${r + 1}${c + 1}`));
  }
  cells.push(row);
}

// check every cell is between 1 and 9
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    solver.add(And(cells[r][c].ge(1), cells[r][c].le(9)));
  }
}

// check each row contains only distinct elements
for (let r = 0; r < 9; r++) {
  //for every element in cells[i], distinct
  solver.add(Distinct(...cells[r]));
}

// check each column contains only distinct elements
for (let r = 0; r < 9; r++) {
  const column = [];
  for (let c = 0; c < 9; c++) {
    column.push(cells[c][r]);
  }
  solver.add(Distinct(...column));
}

// check each 3 x 3 box contains only distinct elements
for (let rBox = 0; rBox < 9; rBox += 3) {
  for (let cBox = 0; cBox < 9; cBox += 3) {
    const square = [];

    for (let r = rBox; r < rBox + 3; r++) {
      for (let c = cBox; c < cBox + 3; c++) {
        square.push(cells[r][c]);
      }
    }
    solver.add(Distinct(...square));
  }
}

// read contraints from input file

const constraints = read();

setTimeout(async () => {
  // add input contraints for filled in cells

  for (let i = 0; i < constraints.length; i++) {
    solver.add(
      cells[constraints[i].r - 1][constraints[i].c - 1].eq(constraints[i].v)
    );
  }

  // check satisfiability and write to file

  try {
    await solver.check();
    const sat = await solver.check();
    const model = solver.model().toString();
    write(sat + "\r\n" + model);
  } catch (e) {
    write("unsat");
  }
}, 4000);
