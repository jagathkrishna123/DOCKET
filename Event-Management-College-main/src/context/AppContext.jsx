
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();  // Make sure this provider is inside <BrowserRouter />
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return parsed.role === "admin";
    }
    return false;
  });
  const [showUserLogin, setShowUserLogin] = useState(false);

  

  const value = {
    navigate,
    user, setUser,
    isAdmin, setIsAdmin,
    showUserLogin, setShowUserLogin
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
