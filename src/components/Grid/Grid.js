import jsonFile from "../../assets/words.json";

const Grid = ({ grid, word }) => {
  return (
    <table>
      <tbody>
        {grid.map((row, i) => {
          // If the level is not visited yet
          if (row[0] === "0") {
            return (
              <tr key={i}>
                {row.map((cell, j) => {
                  let cellClass = "normal";
                  if (cell === word[j]) {
                  }

                  return <td key={`${i}-${j}`}>{cell}</td>;
                })}
              </tr>
            );
          }

          // For every row check if the leter is prsent
          let letters = new Array(26).fill(0);
          for (let n = 0; n < word.length; n++) {
            letters[word.charCodeAt(n) - 97]++;
            console.log(word.charCodeAt(n) - 97);
          }

          // we will be assigning the following codes:
          // 0: Not in the word
          // 1: In the word but in wrong position
          // 2: In correct position

          // First we will be finding the correct position
          let codes = [0, 0, 0, 0, 0];

          // 2
          for (let n = 0; n < word.length; n++) {
            console.log(row[n], word[n]);
            if (row[n] === word[n]) {
              codes[n] = 2;
              letters[word.charCodeAt(n) - 97]--;
            }
          }

          console.log(letters);

          // 1
          for (let n = 0; n < word.length; n++) {
            if (
              codes[n] !== 2 &&
              row[n] !== "0" &&
              letters[row[n].charCodeAt(0) - 97] !== 0
            ) {
              codes[n] = 1;
              letters[row[n].charCodeAt(0) - 97]--;
            }
          }

          console.log(codes);
          return (
            <tr key={i}>
              {row.map((cell, j) => {
                let cellClass = "normal";
                if (codes[j] === 2) {
                  cellClass = "done";
                }
                if (codes[j] === 1) {
                  cellClass = "orange";
                }

                return <td className={cellClass} key={`${i}-${j}`}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
