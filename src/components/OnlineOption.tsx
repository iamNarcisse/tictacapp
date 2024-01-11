import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useApp } from "@/provider/app";
import { GameMode } from "@/types";
import { Button, SxProps } from "@mui/material";
import { FC, useRef } from "react";
import InviteModal, { IModalRef } from "./InviteModal";
import JoinModal, { IJoinModalRef } from "./JoinModal";

type GameModeProps = {};

const OnlineGameOptions: FC<GameModeProps> = () => {
  const inviteModalRef = useRef<IModalRef>(null);
  const joinModalRef = useRef<IJoinModalRef>(null);

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
                if (item.key === "invite") {
                  inviteModalRef.current?.open();
                } else {
                  joinModalRef.current?.open();
                }
              }}
            >
              {item.title}
            </Box>
          );
        })}
      </Stack>
      <InviteModal ref={inviteModalRef} />
      <JoinModal ref={joinModalRef} />
    </Box>
  );
};

export default OnlineGameOptions;
