# sudoku-solver
- This program uses the Z3 SAT solver in order to prove the satisfiability of a given sudoku board, and its solution if possible.

## Running the Project
- Clone the repository to your local file system.
- Add the SMTLIB Formatted constraints to the /input/sudoku_in.txt file as raw text.
- Open the root folder, and open a terminal to that folder.
- Install Dependencies:
  ```sh
  npm i
  ```
- Run the program on the input file:
  ```sh
  npm start
  ```
- After the program outputs "Done!" in the terminal, you should expect the output file /output/sudoku_out.txt to contain whether or not the given constraints on the Sudoku are satisfiable or unsatisfiable, as well as the the SMTLIB formatted solution to the sudoku, if satisfiable.

- *Note - to run again, quit the existing terminal ```^C```, modify the input file as needed, and run ```npm start``` again.

## Authors
- Aidan Roche 
- Ethan Moskowitz
- Ethan Szeto
