import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function Header() {
  const { isUserLoggedIn, logout, email, user, isUserAdmin } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }
  return (
    <div className="bg-green-100">
      <header className="container flex justify-end items-center">
        {isUserLoggedIn && (
          <>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/books'}>
              Book List
            </NavLink>
            {!isUserAdmin && (
              <NavLink className="px-3 py-2 hover:bg-green-300" to={'/user-reserved-books-list'}>
                Your Reserved Books
              </NavLink>
            )}
          </>
        )}

        {isUserAdmin && (
          <>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/all-reserved-books-list'}>
              Reserved Books
            </NavLink>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/create-book'}>
              Add New Book
            </NavLink>

            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/list-users'}>
              Users List
            </NavLink>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/create-users'}>
              Add New User
            </NavLink>
          </>
        )}
        <NavLink className="px-3 py-2 hover:bg-green-300" to={'/list-student'}>
          Student List
        </NavLink>
        {!isUserLoggedIn && (
          <>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/login'}>
              LogIn
            </NavLink>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/register'}>
              Register
            </NavLink>
          </>
        )}

        {isUserLoggedIn && (
          <>
            <NavLink className="px-3 py-2 hover:bg-green-300" to={'/create-student'}>
              Add New Student
            </NavLink>
            <button onClick={handleLogout} className={'px-3 py-2 hover:bg-green-300'}>
              Logout
            </button>
            <Link className="text-green-400 disabled" to={'/list-student'}>
              <>{email}</> <>({user.scope})</>
            </Link>
          </>
        )}
      </header>
    </div>
  );
}
