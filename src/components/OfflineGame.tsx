import { useApp } from "@/provider/app";
import Board from "@components/Board";
import Box from "@mui/material/Box";
import { useState } from "react";
import BoardFooterControls from "./BoardFooterControls";

const OfflineGame: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const { onSetGameMode } = useApp();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const onReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const goBackHome = () => {
    onSetGameMode(undefined);
  };

  return (
    <>
      <Box
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        my={"2rem"}
      >
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onReset={onReset}
        />
        <BoardFooterControls onBackHome={goBackHome} onReset={onReset} />
      </Box>
    </>
  );
};

export default OfflineGame;
