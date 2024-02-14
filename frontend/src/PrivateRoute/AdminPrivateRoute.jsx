import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../store/AuthCtxtProvider';

export default function PrivateRoute({ children }) {
  const { isUserLoggedIn, isUserAdmin } = useAuthContext();

  if (isUserLoggedIn) {
    return isUserAdmin ? children : <Navigate to="/books" />;
  } else {
    return <Navigate to="/login" />;
  }
}
