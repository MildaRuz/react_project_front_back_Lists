import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../../helper';
import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function EditUserPage() {
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const { id } = useParams();

  const [user, setUser] = useAPIData(`${baseApiUrl}users/${id}`);

  function sendUpdateUserData(data) {
    axios
      .put(`${baseApiUrl}users/${id}`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        navigate('/list-users');
        toast.success('User info updated successfuly');
      })
      .catch((error) => console.log(error));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email ?? '',
      scope: user.scope ?? '',
      isActive: user.isActive ?? '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(3).max(128).required(),
      scope: Yup.string().min(3).max(64).required('Role is required field'),
      isActive: Yup.boolean(),
    }),
    onSubmit: (values) => {
      sendUpdateUserData(values);
    },
  });

  console.log(formik.initialValues);
  return (
    <div className="container mx-5 my-5 ">
      <h1 className="text-4xl mb-4 ">Edit User</h1>
      <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['email'] && formik.errors['email'] && (
                  <p className="text-red-600">{formik.errors['email']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="scope" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  id="scope"
                  name="scope"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values['scope']}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="choose role">Choose role</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                {formik.touched['scope'] && formik.errors['scope'] && (
                  <p className="text-red-600">{formik.errors['scope']}</p>
                )}
                {formik.touched['scope'] && formik.errors['scope'] && (
                  <p className="text-red-600">{formik.errors['scope']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="isActive" className="block text-sm font-medium leading-6 text-gray-900">
                Verified
              </label>
              <div className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6">
                <div className="w-24 capitalize">{user.scope}</div>
                <select
                  id="isActive"
                  name="isActive"
                  value={formik.values['isActive']}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-36 text-center"
                >
                  <option>Pending approval</option>
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
                {formik.touched['isActive'] && formik.errors['isActive'] && (
                  <p className="text-red-600">{formik.errors['isActive']}</p>
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
