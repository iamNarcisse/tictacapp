import Square from "@components/Square";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { memo } from "react";
import useSound from "use-sound";
import clickMp3 from "./click.mp3";
import winMp3 from "./win.mp3";
import drawMp3 from "./draw.mp3";

type BoardProps = {
  squares: Array<any>;
  onPlay: (value: any) => void;
  xIsNext: boolean;
  currentMove?: number;
  canPlay?: boolean;
  onReset?: (value?: any) => void;
  onCallBack?: (value?: any) => void;
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

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const [playSound] = useSound(clickMp3);
  const [playWinSound] = useSound(winMp3);
  const [playDrawSound] = useSound(drawMp3);

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
    playSound();
  };

  const winner = calculateWinner(squares);

  const isDraw = () => {
    const isFilled = squares.filter((item) => item).length === 9;
    return !winner && isFilled;
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
    playWinSound();
  } else if (isDraw()) {
    status = "It's a tie!";
    playDrawSound();
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
          <Square
            isSelf={squares[0] === "X"}
            value={squares[0]}
            onClick={() => handleClick(0)}
          />
          <Square
            isSelf={squares[1] === "X"}
            value={squares[1]}
            onClick={() => handleClick(1)}
          />
          <Square
            isSelf={squares[2] === "X"}
            value={squares[2]}
            onClick={() => handleClick(2)}
          />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square
            isSelf={squares[3] === "X"}
            value={squares[3]}
            onClick={() => handleClick(3)}
          />
          <Square
            isSelf={squares[4] === "X"}
            value={squares[4]}
            onClick={() => handleClick(4)}
          />
          <Square
            isSelf={squares[5] === "X"}
            value={squares[5]}
            onClick={() => handleClick(5)}
          />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square
            isSelf={squares[6] === "X"}
            value={squares[6]}
            onClick={() => handleClick(6)}
          />
          <Square
            isSelf={squares[7] === "X"}
            value={squares[7]}
            onClick={() => handleClick(7)}
          />
          <Square
            isSelf={squares[8] === "X"}
            value={squares[8]}
            onClick={() => handleClick(8)}
          />
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
  onCallBack,
}) => {
  const [playSound] = useSound(clickMp3);
  const [playWinSound] = useSound(winMp3);
  const [playDrawSound] = useSound(drawMp3);

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

    playSound();
  };

  const winner = calculateWinner(squares);

  const isDraw = () => {
    const isFilled = squares.filter((item) => item).length === 9;
    return !winner && isFilled;
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
    playWinSound();
    onCallBack?.();
  } else if (isDraw()) {
    status = "It's a tie!";
    playDrawSound();
    onCallBack?.();
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
          <Square
            isSelf={squares[0] === "X"}
            value={squares[0]}
            onClick={() => handleClick(0)}
          />
          <Square
            isSelf={squares[1] === "X"}
            value={squares[1]}
            onClick={() => handleClick(1)}
          />
          <Square
            isSelf={squares[2] === "X"}
            value={squares[2]}
            onClick={() => handleClick(2)}
          />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square
            isSelf={squares[3] === "X"}
            value={squares[3]}
            onClick={() => handleClick(3)}
          />
          <Square
            isSelf={squares[4] === "X"}
            value={squares[4]}
            onClick={() => handleClick(4)}
          />
          <Square
            isSelf={squares[5] === "X"}
            value={squares[5]}
            onClick={() => handleClick(5)}
          />
        </Box>
        <Box flexDirection={"row"} display={"flex"} className="board-row">
          <Square
            isSelf={squares[6] === "X"}
            value={squares[6]}
            onClick={() => handleClick(6)}
          />
          <Square
            isSelf={squares[7] === "X"}
            value={squares[7]}
            onClick={() => handleClick(7)}
          />
          <Square
            isSelf={squares[8] === "X"}
            value={squares[8]}
            onClick={() => handleClick(8)}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(Board);
