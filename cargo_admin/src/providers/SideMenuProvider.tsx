/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextInterface {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const initialState: ContextInterface = {
  visible: false,
  setVisible: () => {},
};

export const SideMenuVisibleContext = createContext<ContextInterface>(initialState);

export const useSideMenuProvider = () => useContext(SideMenuVisibleContext);

export const SideMenuProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(initialState.visible);
  
  const contextValue: ContextInterface = {
    visible,
    setVisible,
  };

  return (
    <SideMenuVisibleContext.Provider value={contextValue}>
      {children}
     </SideMenuVisibleContext.Provider>
  );
};