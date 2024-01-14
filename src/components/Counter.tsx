import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";

interface CounterPrrops {
  xIsNext?: boolean;
  counter: number;
  onElapsed?: (time: string) => void;
}
const Counter: React.FC<CounterPrrops> = ({ xIsNext, counter, onElapsed }) => {
  const getCounterLabel = (): string => {
    if (counter < 10) {
      return `00:0${counter}`;
    }
    return `00:${counter}`;
  };

  useEffect(() => {
    if (counter === 0) {
      onElapsed?.(dayjs().toISOString());
    }
  }, [counter]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      ml={"1rem"}
      position={"relative"}
    >
      {xIsNext ? (
        <Typography
          bottom={0}
          top={"-2rem"}
          position={"absolute"}
          textAlign={"center"}
        >
          {getCounterLabel()}
        </Typography>
      ) : null}
      <Stack
        borderRadius={"0.5rem"}
        px={"0.8rem"}
        py={"1rem"}
        border={"2px solid #3F4E6B"}
        spacing={1}
        bgcolor={"#232C46"}
      >
        <Box
          border={xIsNext ? "2px solid orange" : undefined}
          p={"0.5rem"}
          fontSize={"1rem"}
          fontWeight={"bold"}
          borderRadius={"0.2rem"}
          color={"#2de7ba"}
        >
          X
        </Box>
        <Box
          border={!xIsNext ? "2px solid orange" : undefined}
          p={"0.5rem"}
          fontSize={"1rem"}
          fontWeight={"bold"}
          borderRadius={"0.2rem"}
          color={"#FF9B8D"}
        >
          O
        </Box>
      </Stack>
      {!xIsNext ? (
        <Typography
          bottom={0}
          top={"8rem"}
          position={"absolute"}
          textAlign={"center"}
        >
          {getCounterLabel()}
        </Typography>
      ) : null}
    </Box>
  );
};

export default Counter;
