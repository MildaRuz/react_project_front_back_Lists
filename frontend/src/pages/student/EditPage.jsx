import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../../helper';
import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function EditPage() {
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const { id } = useParams();

  const [student, setStudent] = useAPIData(`${baseApiUrl}students/${id}`);

  function sendUpdateStudentData(data) {
    axios
      .put(`${baseApiUrl}students/${id}`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        navigate('/list-student');
        toast.success('Student info updated successfuly');
      })
      .catch((error) => console.log(error));
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: student.firstname ?? '',
      lastname: student.lastname ?? '',
      email: student.email ?? '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3).max(64).required(),
      lastname: Yup.string().min(3).max(64).required(),
      email: Yup.string().min(3).max(128).required(),
    }),
    onSubmit: (values) => {
      sendUpdateStudentData(values);
    },
  });

  return (
    <div className="container mx-5 my-5 ">
      <h1 className="text-4xl mb-4 ">Edit Student</h1>
      <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['firstname'] && formik.errors['firstname'] && (
                  <p className="text-red-600">{formik.errors['firstname']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['lastname'] && formik.errors['lastname'] && (
                  <p className="text-red-600">{formik.errors['lastname']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['email'] && formik.errors['email'] && (
                  <p className="text-red-600">{formik.errors['email']}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-green-400 hover:bg-green-700 px-3 py-2 text-sm font-semibold text-green-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
