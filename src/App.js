import React, { useState } from "react";
import "./App.css";

const App = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default App;

// square is for little boxes, gets onClick event for X or O
const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

// Board

const Board = () => {
  // state
  //board state
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  //turn state
  const [xIsNext, setXIsNext] = useState(true);
  //handle click
  const handleClick = (index) => {
    //copy of our board state
    const squares = [...boardSquares];
    // if the index of the board is filled, return
    if (calculateWinner(boardSquares) || squares[index]) return;
    //add X or O
    squares[index] = xIsNext ? "X" : "O";
    //calculate next turn

    //set the state of the board
    setBoardSquares(squares);
    // set the state of the turn
    setXIsNext(!xIsNext);
  };

  // create our board

  // create a render square function
  //take in an index
  // return a squre with the correct value and function
  const renderSquare = (index) => {
    return (
      <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
    );
  };

  // initialize status
  let status;
  const winner = calculateWinner(boardSquares);

  status = winner
    ? `Winner is: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

// calculate the winner

const calculateWinner = (squares) => {
  // get our set of winning lines
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // loop through this set
  for (let i = 0; i < winningLines.length; i++) {
    // check to see if values in our squares array fulfill the winning req
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      // if so, return X or O
      return squares[a];
    }
  }
  // else, return nothing
  return null;
};
