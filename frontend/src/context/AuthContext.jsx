import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 checkAuth function
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/checkAuth",
        { withCredentials: true }
      );
      setUser(res.data.user); // make sure backend returns { user: {...} }
      return res.data.user;   // <-- return user for immediate use
    } catch {
      setUser(null);
      return null;
    }
  };

  // 🔹 run on mount
  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
