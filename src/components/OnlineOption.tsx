import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useApp } from "@/provider/app";
import { GameOption } from "@/types";
import { Button, SxProps, Typography } from "@mui/material";
import { FC } from "react";
import CustomButton from "./Button";
import OnlineBoard from "./OnlineBoard";

type GameModeProps = {};

const OnlineGameOptions: FC<GameModeProps> = () => {
  const { gameOption: option, onSetOption, onSetGameMode } = useApp();
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
        <Box width={"30rem"}>
          <Typography variant="h1" textAlign={"center"} fontSize={"3rem"}>
            Play Online
          </Typography>
          <Stack spacing={3} my={"3rem"} width={"100%"}>
            {config.map((item) => {
              return (
                <CustomButton
                  key={item.key}
                  title={item.title}
                  type={item.key === "invite" ? "primary" : "secondary"}
                  onClick={() => onSetOption(item.key as GameOption)}
                >
                  {item.title}
                </CustomButton>
              );
            })}
          </Stack>

          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              sx={{ textTransform: "none", fontSize: "1rem" }}
              onClick={() => {
                onSetGameMode(undefined);
              }}
            >
              Go back
            </Button>
          </Box>
        </Box>
      ) : (
        <OnlineBoard />
      )}
    </Box>
  );
};

export default OnlineGameOptions;
