import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  user: {},
  email: '',
  book: {},
  login(email, token) {},
  logout() {},
  isUserLoggedIn: false,
  isUserAdmin: false,
});

export default function AuthCtxProvider({ children }) {
  // let tokenData = parseJWTToken(localStorage.getItem('token'));

  const [authState, setAuthState] = useState({
    token: '',
    email: '',
    user: {},
  });

  function login(email, token) {
    console.log('įvyko login');
    const tokenData = jwtDecode(token);

    setAuthState({
      token,
      email,
      user: tokenData.user,
    });

    localStorage.setItem('token', token);
  }

  function logout() {
    setAuthState({
      token: '',
      email: '',
      user: {},
    });

    localStorage.removeItem('token');
  }

  const isUserLoggedIn = !!authState.token;

  let isUserAdmin = false;
  if (isUserLoggedIn) {
    const tokenData = jwtDecode(authState.token);
    isUserAdmin = !!(tokenData.user.hasOwnProperty('scope') && tokenData.user.scope === 'admin');
  }

  const ctxValue = {
    isUserLoggedIn,
    isUserAdmin,
    token: authState.token,
    email: authState.email,

    login,
    logout,
    user: authState.user,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
