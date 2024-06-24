import React, { createContext, useContext, useEffect, useState } from "react";

type ModeContextProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

// context with an initial values for ModeContextProps
const ModeContext = createContext<ModeContextProps>({
  mode: "dark",
  toggleMode: () => {},
});

//provider
export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Retrieve the initial mode from local storage on component mount
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode as "light" | "dark");
    }
  }, []);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    // Save the current mode to local storage whenever it changes
    window.localStorage.setItem("mode", mode === "light" ? "dark" : "light");
  };
  // return mode context value
  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

//useMode hook
export const useMode = () => {
  return useContext(ModeContext);
};
