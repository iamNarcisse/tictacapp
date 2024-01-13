import { Button } from "@mui/material";
import Box from "@mui/material/Box";

type SquareProps = {
  value: string | null;
  onClick: () => void;
  isSelf?: boolean;
};

const Square: React.FC<SquareProps> = ({ value, onClick, isSelf }) => {
  return (
    <Box
      width={"7rem"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"7rem"}
      onClick={onClick}
      component={Button}
      borderRadius={"0.5rem"}
      fontWeight={"bold"}
      color={isSelf ? "#2de7ba" : "#FF9B8D"}
      // border={"1px solid #2de7ba"}
      margin={"0.5rem"}
      fontSize={"2.5rem"}
      bgcolor={"#232C46"}
    >
      {value}
    </Box>
  );
};

export default Square;
