// we will be assigning the following cellCodes:
// 0: Not in the solution
// 1: In the solution but in wrong position
// 2: In correct position

const getIndex = (letter) => {
  return letter.charCodeAt(0) - 97;
};

const getRowCode = (row, solution) => {
  // For every row check if the leter is prsent
  let letters = new Array(26).fill(0);
  for (let i = 0; i < solution.length; i++) {
    let index = getIndex(solution[i]);
    letters[index]++;
  }

  // Create an array with the same number of elements
  // as that of the row with all inital value 0
  let cellCodes = new Array(row.length).fill(0);

  // First we will marks all the index where it is a exact match: code = 2
  for (let i = 0; i < solution.length; i++) {
    if (row[i] === solution[i]) {
      cellCodes[i] = 2;
      
      let index = getIndex(solution[i]);
      letters[index]--;
    }
  }

  // Mark the letter which are there but are not in the exact place
  for (let i = 0; i < solution.length; i++) {
    let index = getIndex(row[i]);
    if (cellCodes[i] !== 2 && letters[index] !== 0) {
      cellCodes[i] = 1;
      letters[index]--;
    }
  }

  return cellCodes;
};

export default getRowCode;
