const getInitialGrid = (value = "0", m = 5, n = 5) => {
  let grid = new Array(m).fill(new Array(n).fill(value));
  return grid;
};

const getUpdatedGrid = (grid, guessCount, word) => {
  // For deepcopy and also to remove the reference
  let newGrid = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < 5; i++) {
    newGrid[guessCount][i] = word[i];
  }
  return newGrid;
};

export { getInitialGrid, getUpdatedGrid };
