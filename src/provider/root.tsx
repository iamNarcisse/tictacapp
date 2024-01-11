import AppProvider from "./app";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  pageProps: any;
}

const RootProvider: React.FC<IProps> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default RootProvider;
