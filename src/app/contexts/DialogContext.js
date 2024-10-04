// DialogContext.js
import React, { createContext, useState, useContext } from 'react';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
 
    const [open, setOpen] = useState(false)
    const [char, setChar] = useState(null)

  return (
    <DialogContext.Provider value={{open, setOpen, char, setChar}}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);