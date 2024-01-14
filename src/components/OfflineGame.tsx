import { useApp } from "@/provider/app";
import Board from "@components/Board";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import BoardFooterControls from "./BoardFooterControls";
import Counter from "./Counter";
import dayjs from "dayjs";

const maxPlayTime = 10; // 60 seconds

const getTimeTaken = (counter: number, elaspedTime?: string) => {
  const timeTaken = maxPlayTime - counter;

  if (timeTaken < maxPlayTime) {
    return timeTaken;
  }

  //Time has elapsed
  console.log("REACHED HERE ===>");
  console.log("elaspedTime  ===>", elaspedTime);
  const then = dayjs(elaspedTime);
  const diff = dayjs().diff(then, "second");

  return diff + maxPlayTime;
};

const OfflineGame: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const { onSetGameMode, openToast } = useApp();
  const [count, setCounter] = useState(maxPlayTime);
  const [elaspedTime, setElaspedTime] = useState<string | undefined>();
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // // Timeer oo
    // setCounter(maxPlayTime);
    // setElaspedTime(undefined);

    // console.log(getTimeTaken(count, elaspedTime), "TIME TAKEN IN SECONDS");
  }

  const onReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);

    // // Timer
    // setCounter(maxPlayTime);
    // setElaspedTime(undefined);
  };

  const goBackHome = () => {
    onSetGameMode(undefined);
  };

  // useEffect(() => {
  //   let timer: NodeJS.Timer | number = 0;

  //   if (count === 0) {
  //     return;
  //   }

  //   timer = setInterval(() => {
  //     setCounter((prevCount) => {
  //       if (prevCount === 0) {
  //         // onElapsed();
  //         clearInterval(timer as any);
  //         return prevCount;
  //       }

  //       return prevCount - 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer as any);
  //   };
  // }, [count]);

  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <Box
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        my={"1rem"}
      >
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onReset={onReset}
        />
        <BoardFooterControls onBackHome={goBackHome} onReset={onReset} />
      </Box>
      {/* <Counter xIsNext={xIsNext} counter={count} onElapsed={setElaspedTime} /> */}
    </Box>
  );
};

export default OfflineGame;
