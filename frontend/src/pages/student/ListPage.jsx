import axios from 'axios';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

const studentsUrl = 'http://localhost:3000/api/students';

export default function ListPage() {
  const [studentList, setStudentList] = useAPIData(studentsUrl);
  const [filterValue, setFilterValue] = useState('');

  const { isUserAdmin, isUserLoggedIn, token } = useAuthContext();

  const navigate = useNavigate();

  function handleDelete(id) {
    const currentUrl = `${studentsUrl}/${id}`;
    axios
      .delete(currentUrl, {
        headers: { Authorization: token },
      })
      .then((ats) => {
        // console.log('ats ===', ats);
        console.log('list', studentList);
        console.log('ats.data ===', ats.data);
        setStudentList(studentList.filter((student) => student.id !== id));
        navigate('/list-student', { replace: true });
        toast.success(`Student is deleted`);
      })
      .catch((error) => {
        console.warn('handleDelete ivyko klaida:', error);
        console.warn('handleDelete ivyko klaida:', error.response);
      });
  }
  function handleEdit(id) {
    navigate(`/edit-student/${id}`);
  }

  const filteredStudent = useMemo(() => {
    return studentList.filter(
      (student) =>
        student.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
        student.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
        student.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [studentList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container mx-5 my-5">
      <h1 className="text-4xl mb-4 text-center">Student List</h1>
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
          <div className="w-28">Name</div>
          <div className="w-28">Last name</div>
          <div className="w-28">Email</div>
          <div>Edit/Delete Student</div>
        </div>
        {filteredStudent.map((student) => (
          <div className="border-b-2 border-green-100" key={student.id}>
            <div className="flex flex-row justify-between p-3">
              <div className="w-28">{student.firstname}</div>
              <div className="w-28">{student.lastname}</div>
              <div className="w-28">{student.email}</div>
              <div className="flex gap-2">
                {isUserLoggedIn && (
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-3 rounded-md"
                  >
                    Edit
                  </button>
                )}
                {isUserAdmin && (
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-400 hover:bg-red-700 text-red-950 font-bold py-2 px-3 rounded-md"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
