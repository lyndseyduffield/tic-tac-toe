import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";

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

type Score = {
  x: number;
  o: number;
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
  const [winner, setWinner] = useState<Square>(null);
  const [score, setScore] = useState<Score>({ x: 0, o: 0 });

  const handleSquareClick = (
    square: Square,
    rowIndex: number,
    squareIndex: number
  ) => {
    if (square === null && winner === null) {
      const next: Player = togglePlayer(player);
      // TypeScript has no good way to deep-copy a tuple without
      // the resulting type being an array. Instead, we copy the
      // two layers of the board and cast the type to Board.
      let newBoard: Board = board.map((row) => [...row]) as Board;
      newBoard[rowIndex][squareIndex] = player;
      setBoard(newBoard);
      if (checkWinner(newBoard)) {
        setWinner(player);
        if (player === Player.X) {
          setScore({ ...score, x: score.x + 1 });
        } else if (player === Player.O) {
          setScore({ ...score, o: score.o + 1 });
        }
      }
      setPlayer(next);
    }
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setPlayer(Player.X);
    setWinner(null);
  };

  const Square = (square: Square, rowIndex: number, squareIndex: number) => (
    <div
      onClick={() => handleSquareClick(square, rowIndex, squareIndex)}
      className="Square"
    >
      <span className="Square__content">{squareToString(square)}</span>
    </div>
  );

  const Game = () => {
    if (winner === null && !isDraw(board, winner)) {
      return (
        <div className="Grid">
          {board.map((row, rowIndex) =>
            row.map((square, squareIndex) =>
              Square(square, rowIndex, squareIndex)
            )
          )}
        </div>
      );
    } else if (winner !== null) {
      return (
        <div className="Box">
          <h1 className="Box__title">Player {squareToString(winner)} wins!</h1>
          <Button onClick={handleReset}>Play Again?</Button>
        </div>
      );
    } else if (isDraw(board, winner)) {
      return (
        <div className="Box">
          <h1 className="Box__title">Draw Game!</h1>
          <Button onClick={handleReset}>Play again?</Button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <p>
        Your chance to play the most advanced game ever invented by the human
        race.
      </p>
      {Game()}
      <div className="Scoreboard">
        <div className="Score">
          <h3 className="Score__title">Player X Score</h3>
          <span className="Score__count">{score.x}</span>
        </div>
        <div className="Score">
          <h3 className="Score__title">Player O Score</h3>
          <span className="Score__count">{score.o}</span>
        </div>
      </div>
    </div>
  );
}

const isDraw = (board: Board, winner: Square): boolean => {
  let anyNull = false;

  board.map((row) => {
    return row.forEach((square) => {
      if (square === null) {
        anyNull = true;
      }
    });
  });

  return !anyNull && winner === null;
};

const checkWinner = (board: Board): boolean => {
  const horizontal = checkHorizontalWinner(board);
  const vertical = checkVerticalWinner(board);
  const diagonal = checkDiagonalWinner(board);

  if (horizontal) {
    return horizontal;
  }

  if (vertical) {
    return vertical;
  }

  if (diagonal) {
    return diagonal;
  }

  return false;
};

const checkHorizontalWinner = (board: Board): boolean => {
  let allThree = false;

  const checkIndices = (player: Player) => {
    if (
      (board[0][0] === player &&
        board[0][1] === player &&
        board[0][2] === player) ||
      (board[1][0] === player &&
        board[1][1] === player &&
        board[1][2] === player) ||
      (board[2][0] === player &&
        board[2][1] === player &&
        board[2][2] === player)
    ) {
      allThree = true;
    }
  };

  checkIndices(Player.X);
  checkIndices(Player.O);

  return allThree;
};

const checkVerticalWinner = (board: Board): boolean => {
  let allThree = false;

  const checkIndices = (player: Player) => {
    if (
      (board[0][0] === player &&
        board[1][0] === player &&
        board[2][0] === player) ||
      (board[0][1] === player &&
        board[1][1] === player &&
        board[2][1] === player) ||
      (board[0][2] === player &&
        board[1][2] === player &&
        board[2][2] === player)
    ) {
      allThree = true;
    }
  };

  checkIndices(Player.X);
  checkIndices(Player.O);

  return allThree;
};

const checkDiagonalWinner = (board: Board): boolean => {
  let allThree = false;

  const checkIndices = (player: Player) => {
    if (
      (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) ||
      (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player)
    ) {
      allThree = true;
    }
  };

  checkIndices(Player.X);
  checkIndices(Player.O);

  return allThree;
};

export default App;
