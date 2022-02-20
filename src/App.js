import "./App.css";
import Grid from "./components/Grid/Grid";
import Button from "./components/Button/Button";

// Hooks
import { useEffect, useState } from "react";
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

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (guessCount === 5) {
      alert(`You lose!, the word was ${solution}`);
    }
  }, [solution, guessCount]);

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
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <h1 onClick={() => setIsDarkMode(!isDarkMode)}>Wordle</h1>
      <Grid grid={grid} solution={solution} guessCount={guessCount} />

      <div className="container">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Button
          text={"Guess"}
          onClick={handleSubmit}
          buttonStyle={"btn--primary--solid"}
          disabled={guessCount >= 5}
        />
      </div>
      <Button
        text={"Restart"}
        onClick={handleRestart}
        buttonStyle={"btn--danger--solid"}
        hidden={!(guessCount >= 5)}
      />
    </div>
  );
}

export default App;
