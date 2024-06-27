import React, { createContext, useContext, useState } from "react";

// Create a context with 'writer' as the default value
const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState("writer"); // Default role is 'writer', change as needed

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
