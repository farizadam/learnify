import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('learnify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Simulated login
    const userData = {
      id: Math.random(),
      email,
      name: email.split('@')[0],
      role,
      joinDate: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('learnify_user', JSON.stringify(userData));
    return userData;
  };

  const signup = (email, password, fullName, role) => {
    // Simulated signup
    const userData = {
      id: Math.random(),
      email,
      name: fullName,
      role,
      joinDate: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('learnify_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnify_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
