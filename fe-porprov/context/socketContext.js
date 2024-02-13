// contexts/SocketContext.js

import React, { createContext, useContext } from 'react';
import { initSocket } from '../utils/socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = initSocket(); 
  
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
