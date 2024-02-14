import axios from 'axios';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

const usersUrl = 'http://localhost:3000/api/users';

export default function UsersListPage() {
  const [usersList, setUsersList] = useAPIData(usersUrl);
  const [filterValue, setFilterValue] = useState('');

  const { isUserAdmin, token, user } = useAuthContext();

  const navigate = useNavigate();

  function handleDeleteUser(id) {
    const currentUrl = `${usersUrl}/${id}`;
    console.log(currentUrl);
    axios
      .delete(currentUrl, {
        headers: { Authorization: token },
      })
      .then((ats) => {
        // console.log('ats ===', ats);
        console.log('list', usersList);
        console.log('ats.data ===', ats.data);
        setUsersList(usersList.filter((user) => user.user_id !== id));
        navigate('/list-users', { replace: true });
        toast.success(`User is deleted`);
      })
      .catch((error) => {
        console.warn('handleDeleteUser ivyko klaida:', error);
        console.warn('handleDeleteUser ivyko klaida:', error.response);
      });
  }

  function handleEditUser(id) {
    navigate(`/edit-user/${id}`);
    console.log(`/edit-user/${id}`);
  }

  const filteredUsers = useMemo(() => {
    return usersList.filter(
      (user) =>
        user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.scope.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [usersList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  return (
    <div className="container mx-5 my-5">
      <h1 className="text-4xl mb-4 text-center">Users List</h1>
      <div className="mt-5 mb-5">
        <label htmlFor="filter" className="block text-m font-medium leading-6 text-gray-900">
          Search for a student ( name, lastname or email):
        </label>
        <input
          id="filter"
          name="filter"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          type="text"
          onChange={handleFilterChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="border-b-2 border-green-300 flex flex-row justify-between p-2">
          <div className="w-28">Email</div>
          <div className="w-28">Scope</div>
          <div className="w-28">Confirmation</div>
          <div>Edit/Delete User</div>
        </div>
        {filteredUsers.map((user) => (
          <div className="border-b-2 border-green-100" key={user.user_id}>
            <div className="flex flex-row justify-between p-2">
              <div className="w-16">{user.email}</div>
              <div className="w-24 capitalize">{user.scope}</div>
              <div className="w-36 text-center">{user.isActive === 0 ? 'No' : 'Yes'}</div>
              <div className="flex gap-2">
                {isUserAdmin && (
                  <>
                    <button
                      onClick={() => handleEditUser(user.user_id)}
                      className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-3 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.user_id)}
                      className="bg-red-400 hover:bg-red-700 text-red-950 font-bold py-2 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
