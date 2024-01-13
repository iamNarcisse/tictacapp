import { Box, Button, ButtonOwnProps, Button as MButton } from "@mui/material";
import { MouseEventHandler } from "react";

interface ButtonProps extends ButtonOwnProps {
  title?: string;
  type?: "primary" | "secondary";
  onClick?: MouseEventHandler<any> | undefined;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  type,
  onClick,
  ...rest
}) => {
  const isPrimary = type === "primary";
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      bgcolor={isPrimary ? "white" : "#899CCD"}
      color={isPrimary ? "#232C46" : "white"}
      borderRadius={"0.3rem"}
      py={"0.5rem"}
      sx={{ cursor: "pointer" }}
      onClick={onClick}
      {...rest}
    >
      <Button
        color={"inherit"}
        sx={{ textTransform: "none", fontSize: "1rem" }}
        size={"medium"}
        fullWidth
        onClick={onClick}
      >
        {title}
      </Button>
    </Box>
  );
};

export default CustomButton;
