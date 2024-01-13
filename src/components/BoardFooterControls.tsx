import { Box, Button, Stack } from "@mui/material";
import { memo } from "react";

interface BoardFooterControlProps {
  onReset?: () => void;
  onBackHome?: () => void;
  hideReset?: boolean;
}
const BoardFooterControls: React.FC<BoardFooterControlProps> = ({
  onBackHome,
  onReset,
  hideReset,
}) => {
  return (
    <Stack width={"100%"} my={"2rem"} spacing={"1.5rem"}>
      {!Boolean(hideReset) ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          bgcolor={"white"}
          color={"#232C46"}
          borderRadius={"0.3rem"}
          onClick={onReset}
          py={"0.5rem"}
          sx={{ cursor: "pointer" }}
        >
          <Button
            color={"inherit"}
            sx={{ textTransform: "none", fontSize: "1rem" }}
            size={"medium"}
            fullWidth
            onClick={onReset}
          >
            Reset Game
          </Button>
        </Box>
      ) : null}

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        bgcolor={"#899CCD"}
        color={"white"}
        borderRadius={"0.3rem"}
        onClick={onBackHome}
        py={"0.5rem"}
        sx={{ cursor: "pointer" }}
      >
        <Button
          color={"inherit"}
          sx={{ textTransform: "none", fontSize: "1rem" }}
          size={"medium"}
          fullWidth
          onClick={onBackHome}
        >
          Home
        </Button>
      </Box>
    </Stack>
  );
};

export default memo(BoardFooterControls);
