import React from "react";
import { WalletStore } from "./wallet.ts";

const createRootStore = () => {
  return {
    wallet: new WalletStore(),
  };
};

export const rootStore = createRootStore();

export const StoresContext = React.createContext(rootStore);

export const useStore = () => React.useContext(StoresContext);
