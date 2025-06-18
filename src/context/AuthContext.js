import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Funkcije za testiranje - kasnije zamijeniti pravim loginom
  const login = (userData) => {
  setCurrentUser({
    name: userData.name || (userData.role === 'admin' ? 'Admin' : 'Korisnik'),
    role: userData.role
  });
};

// Za testiranje možete koristiti:
login({ role: 'admin' }); // Za admina
login({ role: 'user', name: 'Ime Korisnika' }); // Za običnog korisnika
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}