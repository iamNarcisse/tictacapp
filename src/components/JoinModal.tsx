import { forwardRef, memo, useImperativeHandle, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, Stack, SxProps } from "@mui/material";

export interface IJoinModalRef {
  open: () => void;
  close: () => void;
}

interface JoinModalProps {
  onChange?: () => void;
}

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const JoinModal = forwardRef<IJoinModalRef, JoinModalProps>(
  ({ onChange }, ref) => {
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (newValue: string) => {
      setOtp(newValue);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
      }),
      []
    );

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            textAlign={"center"}
            color={"black"}
            variant="h6"
            component="h2"
          >
            Enter Game Code
          </Typography>
          <Typography
            fontSize={"2rem"}
            color={"black"}
            sx={{ mt: 2 }}
            textAlign={"center"}
          >
            <MuiOtpInput value={otp} onChange={handleChange} />
          </Typography>

          <Box
            my={"1.5rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button>Join Game</Button>
          </Box>
        </Box>
      </Modal>
    );
  }
);

JoinModal.displayName = "JoinModal";

export default memo(JoinModal);
