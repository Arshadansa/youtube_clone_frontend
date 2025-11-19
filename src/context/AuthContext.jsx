import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axois";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("users/current-user");
      setUser(res.data);
    } catch (err) {
      console.log("Not logged in");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (formData) => {
    const res = await api.post("users/login", formData);
    setUser(res.data);
    return res;
  };

  const signup = async (data) => {
    const res = await api.post("users/register", data);
    setUser(res.data);
    return res;
  };

  const logout = async () => {
    await api.post("users/logout");
    setUser(null);
  };

  return (
  <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
    {loading ? null : children}
  </AuthContext.Provider>
  );
};
