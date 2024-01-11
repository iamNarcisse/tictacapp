import { forwardRef, memo, useImperativeHandle, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface IModalRef {
  open: () => void;
  close: () => void;
}

interface InviteModalProps {
  onChange?: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InviteModal = forwardRef<IModalRef, InviteModalProps>(
  ({ onChange }, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            Share this code or link with your friend.
          </Typography>
          <Typography
            fontSize={"2rem"}
            color={"black"}
            sx={{ mt: 2 }}
            textAlign={"center"}
          >
            4949494y
          </Typography>
        </Box>
      </Modal>
    );
  }
);

InviteModal.displayName = "InviteModal";

export default memo(InviteModal);
