import { GameMode } from "@/types";
import { createContext, memo, useContext, useState } from "react";
interface IAppContext {
  onSetGameMode: (gameMode: GameMode) => void;
  gameMode?: GameMode | undefined;
}

const AppContext = createContext<IAppContext>({
  onSetGameMode: (gameMode: GameMode) => {},
});

export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loadingText, setLoadingText] = useState<string>();
  const [gameMode, setGameMode] = useState<GameMode>();

  const onSetGameMode = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <AppContext.Provider
      value={{
        onSetGameMode,
        gameMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default memo(AppProvider);
