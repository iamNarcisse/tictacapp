import Board from "@components/Board";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      border={"1px solid red"}
      mt="2rem"
    >
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </Box>
  );
}
