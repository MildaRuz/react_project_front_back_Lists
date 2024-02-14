import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../../helper';
import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function EditBookPage() {
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const { book_id } = useParams();

  const [book, setBook] = useAPIData(`${baseApiUrl}books/${book_id}`);

  function sendUpdateBookData(data) {
    axios
      .put(`${baseApiUrl}books/${book_id}`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        navigate('/books');
        toast.success('Book info updated successfuly');
      })
      .catch((error) => console.log(error));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      img_url: book.img_url ?? '/book_img/no_img.jpg',
      title: book.title ?? '',
      author: book.author ?? '',
      description: book.description ?? '',
      year: book.year ?? '',
    },
    validationSchema: Yup.object({
      img_url: Yup.string().min(3).max(255),
      title: Yup.string().min(3).max(255).required('Title is required field'),
      author: Yup.string().min(3).max(128).required('Author is required field'),
      description: Yup.string().min(10).max(255),
      year: Yup.string().min(4).max(4).required('Year is required field'),
    }),
    onSubmit: (values) => {
      sendUpdateBookData(values);
    },
  });

  console.log('values', formik.initialValues);

  return (
    <div className="container mx-5 my-5 ">
      <h1 className="text-4xl mb-4 ">Edit Book</h1>
      <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="title"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['title'] && formik.errors['title'] && (
                  <p className="text-red-600">{formik.errors['title']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                Author
              </label>
              <div className="mt-2">
                <input
                  id="author"
                  name="author"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.author}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['author'] && formik.errors['author'] && (
                  <p className="text-red-600">{formik.errors['author']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                Year
              </label>
              <div className="mt-2">
                <input
                  id="year"
                  name="year"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.year}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['year'] && formik.errors['year'] && (
                  <p className="text-red-600">{formik.errors['year']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values['description']}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.touched['description'] && formik.errors['description'] && (
                  <p className="text-red-600">{formik.errors['description']}</p>
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
