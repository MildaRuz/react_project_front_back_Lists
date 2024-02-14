import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../../helper';
import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [student, setStudent] = useAPIData(`${baseApiUrl}students/`);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: student.email ?? '',
      password: student.password ?? '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(3).max(128).required('Please add your email'),
      password: Yup.string().min(5).max(30).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      sendAxiosData(values);
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${baseApiUrl}/auth/login`, data)
      .then((resp) => {
        console.log('resp ===', resp);
        toast.success('Welcome');
        login(data.email, resp.data.token);
        navigate('/list-student', { replace: true });
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error.response.data);
        toast.error('User not found, check your email or password or register please');
      });
  }

  return (
    <div className="container mx-5 my-5">
      <h1 className="text-4xl mb-4">LogIn</h1>
      <p>
        Do not have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="bg-transparent hover:underline underline-offset-4 text-green-950 font-bold py-2 px-3 rounded-md"
        >
          Register here
        </button>
      </p>

      <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
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
            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['password'] && formik.errors['password'] && (
                  <p className="text-red-600">{formik.errors['password']}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-green-400 hover:bg-green-700 px-3 py-2 text-sm font-semibold text-green-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                LogIn
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
