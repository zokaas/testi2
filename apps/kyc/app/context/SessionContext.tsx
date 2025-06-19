import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface SessionContextType {
  sessionTtl: number | 0;
  setSessionTtl: (ttl: number) => void;
}

// Create the context with a default value
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Create a provider component that wraps the app with context
export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionTtl, setSessionTtl] = useState<number | 0>(0);

  return (
    <SessionContext.Provider
      value={{
        sessionTtl,
        setSessionTtl,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context (for easier usage in components)
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
