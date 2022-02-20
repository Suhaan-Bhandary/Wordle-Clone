import "./App.css";
import Grid from "./components/Grid/Grid";

// Hooks
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

// Util functions
import getRandomWord from "./utils/getRandomWord";
import { getInitialGrid, getUpdatedGrid } from "./utils/generateGrid";

function App() {
  // Grid, solution and the count of the user
  const [grid, setGrid] = useLocalStorage("grid", getInitialGrid());
  const [solution, setSolution] = useLocalStorage("solution", getRandomWord);
  const [guessCount, setGuessCount] = useLocalStorage("guessCount", 0);

  // Input from the user
  const [word, setWord] = useState("");

  const handleSubmit = () => {
    // Converting the user input to lower case, since solution is always in lower case
    let lowerCaseWord = word.toLowerCase();

    // Check if the word given by the user is of 5 chars only
    if (word.length !== 5) {
      alert("Please enter a word with 5 characters only");
      return;
    }

    // Increasing the guess count
    setGrid(getUpdatedGrid(grid, guessCount, lowerCaseWord));
    setGuessCount((guessCount) => guessCount + 1);

    // Handle winning condition
    if (lowerCaseWord === solution) {
      alert(`User won the game in ${guessCount} guesses`);
    }
  };

  const handleRestart = () => {
    // Creatin a new Game for the user
    setGuessCount(0);
    setSolution(getRandomWord());
    setGrid(getInitialGrid());
  };

  return (
    <div className="App">
      
      <h1>Wordle</h1>
      <h2>guessCount: {guessCount}</h2>
      <h2>word: {solution}</h2>

      <Grid grid={grid} solution={solution} guessCount={guessCount}/>

      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button disabled={guessCount >= 5} onClick={handleSubmit}>
        Enter
      </button>
      <button onClick={handleRestart}>Restart</button>

    </div>
  );
}

export default App;
