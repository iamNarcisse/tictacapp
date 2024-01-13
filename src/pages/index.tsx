import GameMode from "@/components/GameMode";
import OfflineGame from "@/components/OfflineGame";
import OnlineGameOptions from "@/components/OnlineOption";
import { useApp } from "@/provider/app";
import Box from "@mui/material/Box";

export default function Home() {
  const { gameMode } = useApp();

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
        <>{gameMode === "single" ? <OfflineGame /> : <OnlineGameOptions />}</>
      )}
    </Box>
  );
}
