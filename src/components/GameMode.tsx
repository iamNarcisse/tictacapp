import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useApp } from "@/provider/app";
import { GameMode } from "@/types";
import { SxProps, Typography } from "@mui/material";
import { FC } from "react";
import CustomButton from "./Button";

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
      // border: "1px solid #2de7ba",
    },
  };

  return (
    <Box py={"4rem"} width={"30rem"} justifyContent={"center"}>
      <Typography textAlign={"center"} fontSize={"3rem"} variant="h1">
        Tic Tac Toe
      </Typography>
      <Stack spacing={3} my={"3rem"} px={"4rem"} width={"100%"}>
        {config.map((item) => {
          return (
            <CustomButton
              key={item.key}
              title={item.title}
              type={item.key === "single" ? "primary" : "secondary"}
              sx={styles}
              onClick={() => onSetGameMode(item.key as GameMode)}
            >
              {item.title}
            </CustomButton>
          );
        })}
      </Stack>
    </Box>
  );
};

export default GameMode;
