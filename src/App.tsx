import React, { useState } from "react";
import "./App.css";

enum Player {
  X,
  O,
}

const togglePlayer = (player: Player): Player => {
  if (player === Player.X) {
    return Player.O;
  } else {
    return Player.X;
  }
};

type Square = Player | null;

const emptySquare: Square = null;

type Row = [Square, Square, Square];

const emptyRow: Row = [emptySquare, emptySquare, emptySquare];

type Board = [Row, Row, Row];

const emptyBoard: Board = [emptyRow, emptyRow, emptyRow];

const squareToString = (value: Square) => {
  switch (value) {
    case Player.X:
      return "X";
    case Player.O:
      return "O";
    default:
      return "";
  }
};

function App() {
  const [player, setPlayer] = useState<Player>(Player.X);
  const [board, setBoard] = useState<Board>(emptyBoard);

  const renderSquare = (
    square: Square,
    rowIndex: number,
    squareIndex: number
  ) => (
    <div
      onClick={() => handleSquareClick(square, rowIndex, squareIndex)}
      className="Square"
    >
      {squareToString(square)}
    </div>
  );

  const handleSquareClick = (
    status: Square,
    rowIndex: number,
    squareIndex: number
  ) => {
    if (status === null) {
      const next: Player = togglePlayer(player);
      // TypeScript has no good way to deep-copy a tuple without
      // the resulting type being an array. Instead, we copy the
      // two layers of the board and cast the type to Board.
      let newBoard: Board = board.map((row) => [...row]) as Board;
      newBoard[rowIndex][squareIndex] = player;
      setBoard(newBoard);
      setPlayer(next);

      const isWinner = checkWinner(newBoard);

      if (isWinner) {
        window.alert(`Player ${squareToString(player)} wins!`);
      }
    }
  };

  return (
    <div className="App">
      <div className="Grid">
        {board.map((row, rowIndex) =>
          row.map((square, squareIndex) =>
            renderSquare(square, rowIndex, squareIndex)
          )
        )}
      </div>
    </div>
  );
}

const checkWinner = (board: Board): boolean => {
  return checkHorizontalWinner(board);
};

const checkHorizontalWinner = (board: Board): boolean => {
  let allThree = false;

  board.forEach((row) => {
    const X = Player.X;
    const O = Player.O;

    let keepTrack = {
      X: 0,
      O: 0,
    };

    row.forEach((item) => {
      if (item === X) {
        keepTrack.X++;
      } else if (item === O) {
        keepTrack.O++;
      }
    });

    if (keepTrack.X === 3 || keepTrack.O === 3) {
      allThree = true;
    }
  });

  return allThree;
};

export default App;
