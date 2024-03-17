import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const EnvConfigStoreProvider = ({ children }) => {
  const [currentConfig, setCurrentConfig] = useState("none");

  const updateCurrentConfig = (newConfig) => {
    setCurrentConfig(newConfig);
  };

  const value = {
    currentConfig,
    updateCurrentConfig,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

// CUSTOM HOOK
export const useEnvConfigStore = () => useContext(StoreContext);
