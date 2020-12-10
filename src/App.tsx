import React, { useState } from "react";
import "./App.css";

enum Symbol {
  X,
  O,
}

const toggleSymbol = (symbol: Symbol): Symbol => {
  if (symbol === Symbol.X) {
    return Symbol.O;
  } else {
    return Symbol.X;
  }
};

type SquareStatus = Symbol | null;

interface Square {
  contains: SquareStatus;
}

const emptySquare: Square = { contains: null };

const renderSquareStatus = (value: SquareStatus) => {
  switch (value) {
    case Symbol.X:
      return "X";
    case Symbol.O:
      return "O";
    default:
      return "";
  }
};

interface AppState {
  nextPlay: Symbol;
  squares: [Square];
}

function App() {
  const [nextPlay, setNextPlay] = useState(Symbol.X);

  const [squares, setSquares] = useState([
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
    emptySquare,
  ]);

  const renderSquare = (square: Square, index: number) => (
    <div
      onClick={() => handleSquareClick(square.contains, index)}
      className="Square"
    >
      {renderSquareStatus(square.contains)}
    </div>
  );

  const handleSquareClick = (status: SquareStatus, index: number) => {
    if (status === null) {
      const next = toggleSymbol(nextPlay);
      let newSquares = Array.from(squares);
      newSquares[index] = { contains: nextPlay };
      setSquares(newSquares);
      setNextPlay(next);
    }
  };

  return (
    <div className="App">
      <div className="Grid">{squares.map(renderSquare)}</div>
    </div>
  );
}

export default App;
