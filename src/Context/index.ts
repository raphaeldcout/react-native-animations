import { createContext } from "react";

export type ContextType = {
  backgroundColorApp: string;
  setBackgroundColorApp: (color: string) => void;
};

const Context = createContext<ContextType | null>(null);

export default Context;
