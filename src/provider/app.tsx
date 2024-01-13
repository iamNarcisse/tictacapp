import { GameMode, GameOption } from "@/types";
import { createContext, memo, useContext, useState } from "react";
interface IAppContext {
  onSetGameMode: (gameMode?: GameMode) => void;
  gameMode?: GameMode | undefined;
  gameOption?: GameOption | undefined;
  onSetOption: (option?: GameOption) => void;
}

const AppContext = createContext<IAppContext>({
  onSetGameMode: (gameMode?: GameMode) => {},
  onSetOption: (gameMode?: GameOption) => {},
});

export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loadingText, setLoadingText] = useState<string>();
  const [gameMode, setGameMode] = useState<GameMode>();
  const [option, setOption] = useState<GameOption | undefined>();

  const onSetGameMode = (mode?: GameMode) => {
    setGameMode(mode);
  };

  const onSetOption = (option?: GameOption) => {
    setOption(option);
  };

  return (
    <AppContext.Provider
      value={{
        onSetGameMode,
        gameMode,
        onSetOption,
        gameOption: option,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default memo(AppProvider);
