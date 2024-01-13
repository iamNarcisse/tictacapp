import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { FC } from "react";
import { Button, SxProps } from "@mui/material";
import { useApp } from "@/provider/app";
import { GameMode } from "@/types";

type GameModeProps = {};

const GameMode: FC<GameModeProps> = () => {
  const { onSetGameMode } = useApp();
  const config = [
    {
      title: "Play Solo",
      key: "single",
    },
    {
      title: "Play with a friend",
      key: "double",
    },
  ];

  const styles: SxProps = {
    ":hover": {
      border: "1px solid #2de7ba",
    },
  };

  return (
    <Box px={"10rem"} py={"4rem"}>
      <h1>Tic Tac Toe </h1>
      <Stack spacing={2} my={"3rem"}>
        {config.map((item) => {
          return (
            <Box
              key={item.key}
              border="1px solid gray"
              component={Button}
              color={"white"}
              sx={styles}
              textTransform={"capitalize"}
              onClick={() => onSetGameMode(item.key as GameMode)}
            >
              {item.title}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default GameMode;
