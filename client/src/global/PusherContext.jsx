import { createContext, useContext, } from 'react';


const PusherContext = createContext();

function PusherProvider({ pusher, children }) {
  return (
    <PusherContext.Provider value={{ pusher }}>
      {children}
    </PusherContext.Provider>
  );
}

function usePusher() {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error("usePusher must be used within a PusherProvider");
  }

  const { pusher } = context;
  return pusher;
}

export { PusherProvider, usePusher };