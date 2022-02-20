import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [grid, setGrid] = useLocalStorage("grid", getInitialGrid);
  const [guess, setGuess] = useLocalStorage("guess", 0);
  const [word, setWord] = useLocalStorage("word", getRandomWord);

  const [userGuess, setuserGuess] = useState("");

  const handleSubmit = () => {
    // If Last guess is also wrong
    if (guess >= 5) {
      setGrid(getInitialGrid());
      setGuess(0);
      return;
    }

    // First check if the length is same of not
    if (userGuess.length !== 5) {
      alert("Please enter a word with 5 characters only");
      return;
    }

    // Now check if the user word is same as the word
    if (userGuess === word) {
      alert(`User won the game in ${guess} guesses`);
    }

    // Replace the level with the current word
    let newGrid = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(grid[i][j]);
      }
      newGrid.push(row);
    }

    for (let i = 0; i < 5; i++) {
      newGrid[guess][i] = userGuess[i];
    }

    console.log(newGrid);
    setGrid(newGrid);
    setGuess((guess) => guess + 1);
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      <h2>Guess: {guess}</h2>
      <h2>word: {word}</h2>

      <Grid grid={grid} word={word} />

      <input
        type="text"
        value={userGuess}
        onChange={(e) => setuserGuess(e.target.value)}
      />
      <button onClick={handleSubmit}>Enter</button>
    </div>
  );
}

const getInitialGrid = () => {
  let grid = [];
  for (let i = 0; i < 5; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      row.push("0");
    }
    grid.push(row);
  }

  return grid;
};

const getRandomWord = () => {
  return "hanna";
};

export default App;
