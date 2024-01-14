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
import { Button, SxProps } from "@mui/material";
import { useApp } from "@/provider/app";

export interface IModalRef {
  open: () => void;
  close: () => void;
}

interface InviteModalProps {
  onChange?: () => void;
  onInvite?: () => void;
  joinStatus?: string;
  room?: string;
  onCancel?: () => void;
}

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "0.5rem",
  p: 4,
};

const InviteModal = forwardRef<IModalRef, InviteModalProps>(
  ({ onChange, onInvite, joinStatus, room, onCancel }, ref) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { openToast } = useApp();

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

    useEffect(() => {
      if (!joinStatus) {
        onInvite?.();
      }
    }, []);

    const copyToClipBoard = async (copyMe?: string) => {
      if (!copyMe) {
        return;
      }
      try {
        await navigator.clipboard.writeText(copyMe);
        openToast?.("Copied to clipboard.", "success");
      } catch (err) {
        console.log(err);
      }
    };

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
              <Button onClick={handleCancel} sx={{ marginTop: "1rem" }}>
                Cancel
              </Button>
            </Box>
          ) : null}

          {joinStatus === "waiting" ? (
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
                Share this code to your friend
              </Typography>

              <Typography
                fontSize={"2rem"}
                color={"black"}
                sx={{ mt: 2, cursor: "pointer" }}
                textAlign={"center"}
                fontWeight={"bold"}
                onClick={() => copyToClipBoard(room)}
              >
                {room}
              </Typography>

              <Button
                color={"error"}
                onClick={handleCancel}
                sx={{ marginTop: "1rem" }}
              >
                Cancel
              </Button>
            </Box>
          ) : null}
        </Box>
      </Modal>
    );
  }
);

InviteModal.displayName = "InviteModal";

export default memo(InviteModal);
