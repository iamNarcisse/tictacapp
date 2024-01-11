import { Button } from "@mui/material";
import Box from "@mui/material/Box";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <Box
      width={"6rem"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"6rem"}
      onClick={onClick}
      component={Button}
      borderRadius={"0.5rem"}
      fontWeight={"bold"}
      color={"white"}
      border={"1px solid #2de7ba"}
      margin={"0.5rem"}
      fontSize={"1.5rem"}
    >
      {value}
    </Box>
  );
};

export default Square;
