import Board from "@components/Board";
import { useState } from "react";
import Box from "@mui/material/Box";
import GameMode from "@/components/GameMode";
import { useApp } from "@/provider/app";
import OnlineGameOptions from "@/components/OnlineOption";
import useSocket from "@/hooks/socket";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { isConnected, socket } = useSocket();

  const { gameMode } = useApp();

  function handlePlay(nextSquares: any) {
    console.log(nextSquares, "NEXT SQUARES ===>");
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  console.log(currentMove, "CURRENT MOVE ===>");

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
          ) : (
            <OnlineGameOptions />
          )}
        </>
      )}
    </Box>
  );
}
