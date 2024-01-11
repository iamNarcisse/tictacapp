import { ButtonOwnProps, Button as MButton } from "@mui/material";

interface ButtonProps extends ButtonOwnProps {}

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  return <MButton {...rest} />;
};

export default Button;
