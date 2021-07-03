import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to Move # ${move}` : `Go to Game Start`;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = () => {
    if (winner) return `Winner: ${winner}`;
    else return `Next Player: ${xIsNext ? "X" : "O"}`;
  };

  // if (winner) {
  //   status = `Winner: ${winner}`;
  // } else {
  //   status = `Next Player: ${xIsNext ? "X" : "O"}`;
  // }

  function handleClick(i) {
    const data = history.slice(0, stepNumber + 1);
    const current = data[data.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory(data.concat([{ squares: squares }]));
    setNext(!xIsNext);
    setStepNumber(data.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setNext(step % 2 === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => {
            handleClick(i);
          }}
        />
      </div>
      <div className="game-info">
        <div>{status()}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
