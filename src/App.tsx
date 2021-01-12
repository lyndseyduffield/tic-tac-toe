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

const checkWinner = (board: Board): boolean | undefined => {
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
      return diagonal
    }

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

const checkVerticalWinner = (board: Board): boolean => {
  let allThree = false;

  let keepTrackX = {
    zero: 0,
    one: 0,
    two: 0
  };

  let keepTrackO = {
    zero: 0,
    one: 0,
    two: 0
  };

 board.forEach((row) => {
    const X = Player.X;
    const O = Player.O;    
    
    row.forEach((item, index) => {
      if (item === X && index === 0) {
        keepTrackX.zero++
      }
      if (item === X && index === 1) {
        keepTrackX.one++
      }
      if (item === X && index === 2) {
        keepTrackX.two++
      }
      if (item === O && index === 0) {
        keepTrackO.zero++
      }
      if (item === O && index === 1) {
        keepTrackO.one++
      }
      if (item === O && index === 2) {
        keepTrackO.two++
      }
    });

    console.log(keepTrackX, keepTrackO);

    if (keepTrackX.zero === 3 || keepTrackX.one === 3 || keepTrackX.two === 3) {
      allThree = true;
    }

    if (keepTrackO.zero === 3 || keepTrackO.one === 3 || keepTrackO.two === 3) {
      allThree = true;
    }
  });

  return allThree;
};


const checkDiagonalWinner = (board: Board): boolean => {
  let allThree = false;

  let keepTrack: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  
  board.forEach((row, rowIndex) => {
    const X = Player.X;
    const O = Player.O;
    
    row.forEach((item, index) => {
      if (item === X && index === 0) {
        keepTrack[rowIndex][0] = X
      }
      if (item === X && index === 1) {
        keepTrack[rowIndex][1] = X
      }
      if (item === X && index === 2) {
        keepTrack[rowIndex][2] = X
      }
      if (item === O && index === 0) {
        keepTrack[rowIndex][0] = O;
      }
      if (item === O && index === 1) {
        keepTrack[rowIndex][1] = O; 
      }
      if (item === O && index === 2) {
        keepTrack[rowIndex][2] = O;
      }
    });

    if ( (keepTrack[0][0] === X && keepTrack[1][1] === X && keepTrack[2][2] === X) || (keepTrack[0][2] === X && keepTrack[1][1] === X && keepTrack[2][0] === X) ) {
      allThree = true;
    }

    if ( (keepTrack[0][0] === O && keepTrack[1][1] === O && keepTrack[2][2] === O) || (keepTrack[0][2] === O && keepTrack[1][1] === O && keepTrack[2][0] === O) ) {
      allThree = true;
    }

  })

  return allThree;
}

export default App;
