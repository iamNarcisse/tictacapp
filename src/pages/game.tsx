import Board from "@components/Board";
import { useState } from "react";
import Box from "@mui/material/Box";
import GameMode from "@/components/GameMode";
import { useApp } from "@/provider/app";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const { gameMode } = useApp();
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
      flexDirection={"column"}
      mt="2rem"
    >
      {!gameMode ? (
        <GameMode />
      ) : (
        <>
          {gameMode === "single" ? (
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          ) : null}
        </>
      )}
    </Box>
  );
}
