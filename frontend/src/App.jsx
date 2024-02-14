import './index.css';

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import AddNewBookPage from './pages/books/AddNewBookPage.jsx';
import BookList from './pages/books/BookList.jsx';
import EditBookPage from './pages/books/EditBookPage.jsx';
import OneBookPage from './pages/books/OneBookPage.jsx';
import AddNewStudent from './pages/student/AddNewStudent.jsx';
import EditPage from './pages/student/EditPage.jsx';
import EditUserPage from './pages/student/EditUserPage.jsx';
import ListPage from './pages/student/ListPage.jsx';
import LoginPage from './pages/student/LoginPage.jsx';
import RegisterPage from './pages/student/RegisterPage.jsx';
import AddNewUser from './pages/student/UserCreatePage.jsx';
import UsersListPage from './pages/student/UsersListPage.jsx';
import AdminPrivateRoute from './PrivateRoute/AdminPrivateRoute.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';

function App() {
  return (
    <>
      <div className="">
        <Toaster />
        <Header />

        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/one-book/:book_id" element={<OneBookPage />} />
          <Route
            path="/edit-book/:book_id"
            element={
              <AdminPrivateRoute>
                <EditBookPage />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/create-book"
            element={
              <AdminPrivateRoute>
                <AddNewBookPage />
              </AdminPrivateRoute>
            }
          />
          <Route path="/list-student" element={<ListPage />} />

          <Route
            path="/create-student"
            element={
              <PrivateRoute>
                <AddNewStudent />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-student/:id"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/list-users"
            element={
              <AdminPrivateRoute>
                <UsersListPage />
              </AdminPrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/create-users"
            element={
              <AdminPrivateRoute>
                <AddNewUser />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <AdminPrivateRoute>
                <EditUserPage />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
