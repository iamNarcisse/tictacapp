import { GameMode, GameOption } from "@/types";
import { createContext, memo, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

interface IAppContext {
  onSetGameMode: (gameMode?: GameMode) => void;
  gameMode?: GameMode | undefined;
  gameOption?: GameOption | undefined;
  onSetOption: (option?: GameOption) => void;
  openToast: (msg?: string, type?: AlertColor) => void;
}

const AppContext = createContext<IAppContext>({
  onSetGameMode: (gameMode?: GameMode) => {},
  onSetOption: (gameMode?: GameOption) => {},
  openToast: (msg?: string, type?: AlertColor) => {},
});

export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loadingText, setLoadingText] = useState<string>();
  const [gameMode, setGameMode] = useState<GameMode>();
  const [option, setOption] = useState<GameOption | undefined>();
  const [toast, setToast] = useState<{
    open: boolean;
    message?: string;
    type?: string;
  }>({
    open: true,
    message: undefined,
  });

  const onSetGameMode = (mode?: GameMode) => {
    setGameMode(mode);
  };

  const onSetOption = (option?: GameOption) => {
    setOption(option);
  };

  const openToast = (msg?: string, type?: AlertColor) => {
    setToast({
      open: true,
      message: msg,
      type,
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({
      open: false,
      message: undefined,
    });
  };

  return (
    <AppContext.Provider
      value={{
        onSetGameMode,
        gameMode,
        onSetOption,
        gameOption: option,
        openToast: openToast,
      }}
    >
      {children}

      {toast.open && toast.message ? (
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={toast.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ) : null}
    </AppContext.Provider>
  );
};

export default memo(AppProvider);
