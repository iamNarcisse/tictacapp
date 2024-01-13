import Square from "@components/Square";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { memo } from "react";

type BoardProps = {
  squares: Array<any>;
  onPlay: (value: any) => void;
  xIsNext: boolean;
  currentMove?: number;
  canPlay?: boolean;
  onReset?: (value?: any) => void;
};

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

const calculateWinner = (squares: Array<any>) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay, onReset }) => {
  const handleClick = (index: number) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <Box>
      <Box
        display={"flex"}
        textAlign={"center"}
        flexDirection={"row"}
        className="status"
        justifyContent={"center"}
        py={"1rem"}
        my={"1rem"}
        fontSize={"2rem"}
        bgcolor={"#3F4E6B"}
        borderRadius={"0.5rem"}
      >
        {status}
      </Box>

      <Stack bgcolor={"#3F4E6B"} borderRadius={"0.5rem"} p={"0.6rem"}>
        <Box flexDirection={"row"} display={"flex"}>
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </Box>
      </Stack>
    </Box>
  );
};

export const OBoard: React.FC<BoardProps> = ({
  xIsNext,
  squares,
  onPlay,
  canPlay,
}) => {
  const handleClick = (index: number) => {
    if (!canPlay) return;

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <Box>
      <Box
        display={"flex"}
        textAlign={"center"}
        flexDirection={"row"}
        className="status"
        justifyContent={"center"}
        py={"1rem"}
        my={"1rem"}
        fontSize={"2rem"}
        bgcolor={"#3F4E6B"}
        borderRadius={"0.5rem"}
      >
        {status}
      </Box>
      <Stack bgcolor={"#3F4E6B"} borderRadius={"0.5rem"} p={"0.6rem"}>
        <Box flexDirection={"row"} display={"flex"}>
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(Board);
