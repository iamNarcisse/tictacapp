import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Button, SxProps } from "@mui/material";
import { FC, useState } from "react";
import OnlineBoard from "./OnlineBoard";
import { useApp } from "@/provider/app";
import { GameOption } from "@/types";

type GameModeProps = {};

const OnlineGameOptions: FC<GameModeProps> = () => {
  const { gameOption: option, onSetOption } = useApp();
  const config = [
    {
      title: "Invite a friend",
      key: "invite",
    },
    {
      title: "Join a friend",
      key: "join",
    },
  ];
  const styles: SxProps = {
    ":hover": {
      border: "1px solid #2de7ba",
    },
  };

  return (
    <Box px={"10rem"} py={"4rem"}>
      {!option ? (
        <>
          <h1>Play Online </h1>
          <Stack spacing={2} my={"3rem"}>
            {config.map((item) => {
              return (
                <Box
                  key={item.key}
                  border="1px solid gray"
                  component={Button}
                  color={"white"}
                  sx={styles}
                  onClick={() => {
                    onSetOption(item.key as GameOption);
                  }}
                >
                  {item.title}
                </Box>
              );
            })}
          </Stack>
        </>
      ) : (
        <OnlineBoard />
      )}
    </Box>
  );
};

export default OnlineGameOptions;
