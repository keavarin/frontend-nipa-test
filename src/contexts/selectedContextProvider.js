import { useState, createContext, useEffect } from "react";

export const SelectContext = createContext();

function SelectContextProvider({ children }) {
  const [show, setShow] = useState(false);

  return (
    <SelectContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}
export default SelectContextProvider;
