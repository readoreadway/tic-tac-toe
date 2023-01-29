import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const initialSquares = Array(9).fill(null);

  const [square, setSquare] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(square);

  const status = winner
    ? `${winner} Wins!`
    : `${xIsNext ? "X" : "O"}" plays next`;

  const clickEventHandler = (i) => {
    const newSquares = [...square];

    const winnerKnown = Boolean(calculateWinner(newSquares));
    const squareClicked = Boolean(newSquares[i]);

    if (squareClicked || winnerKnown) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setSquare(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <div>
        <Square value={square[i]} onClickEvent={() => clickEventHandler(i)} />
      </div>
    );
  };

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="square-box">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="square-box">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="square-box">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
    </div>
  );
};
export default Board;

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //columns
    [0, 4, 8],
    [2, 4, 6], //diagonal
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }

  return null;
}
