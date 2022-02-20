import "./Grid.css";
import getRowCode from "../../utils/getRowCode";

const codeName = {
  0: "not-present",
  1: "present",
  2: "correct",
};

const Grid = ({ grid, solution, guessCount }) => {
  return (
    <table className="Grid">
      <tbody>
        {grid.map((row, i) => {
          // If i is less than guess count then it will have words in it
          // Get the cell code for each of the cell in the row
          let cellCodes = null;
          if (i < guessCount) cellCodes = getRowCode(row, solution);

          // Displaing the cells in the row
          return (
            <tr key={i}>
              {row.map((cell, j) => {
                return (
                  <td
                    className={cellCodes ? codeName[cellCodes[j]] : ""}
                    key={`${i}-${j}`}
                  >
                    {cell === "0" ? "" : cell}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
