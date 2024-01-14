import { Button, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import { forwardRef, memo, useImperativeHandle, useState } from "react";

export interface IJoinModalRef {
  open: () => void;
  close: () => void;
}

interface JoinModalProps {
  onChange?: () => void;
  onJoin?: (room: string) => void;
  status?: string;
  onCancel?: (room?: string) => void;
}

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "47%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const JoinModal = forwardRef<IJoinModalRef, JoinModalProps>(
  ({ onChange, onJoin, status, onCancel }, ref) => {
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (newValue: string) => {
      setOtp(newValue);
    };

    const handleCancel = () => {
      onCancel?.();
      handleClose();
    };

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
      }),
      []
    );

    if (status === "joined") return null;

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
            <MuiOtpInput value={otp} length={6} onChange={handleChange} />
          </Typography>

          <Box
            my={"1.5rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            // flexDirection={"column"}
          >
            <Button color={"error"} onClick={handleCancel} sx={{ mx: "2rem" }}>
              Cancel
            </Button>

            <Button
              disabled={otp.length !== 6}
              onClick={() => {
                onJoin?.(otp);
              }}
            >
              Join Game
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
);

JoinModal.displayName = "JoinModal";

export default memo(JoinModal);
