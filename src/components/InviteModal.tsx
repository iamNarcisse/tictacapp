import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export interface IModalRef {
  open: () => void;
  close: () => void;
}

interface InviteModalProps {
  onChange?: () => void;
  onInvite?: () => void;
  joinStatus?: string;
  room?: string;
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
  ({ onChange, onInvite, joinStatus, room }, ref) => {
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

    useEffect(() => {
      if (!joinStatus) {
        onInvite?.();
      }
    }, []);

    return (
      <Modal
        open={open}
        // onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!joinStatus ? (
            <Box
              alignContent={"center"}
              justifyContent={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography
                textAlign={"center"}
                color={"black"}
                variant="h6"
                component="h2"
              >
                Connecting....
              </Typography>
              <Button onClick={handleClose} sx={{ marginTop: "1rem" }}>
                Cancel
              </Button>
            </Box>
          ) : null}

          {joinStatus === "waiting" ? (
            <Box>
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
                {room}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Modal>
    );
  }
);

InviteModal.displayName = "InviteModal";

export default memo(InviteModal);
