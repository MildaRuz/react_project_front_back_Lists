import '../../App.css';

import axios from 'axios';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

const booksUrl = 'http://localhost:3000/api/books';

export default function BookList() {
  const [bookList, setBookList] = useAPIData(booksUrl);
  const [filterValue, setFilterValue] = useState('');

  const { isUserAdmin, isUserLoggedIn, token } = useAuthContext();

  const navigate = useNavigate();

  function handleDelete(id) {
    const currentUrl = `${booksUrl}/${id}`;
    axios
      .delete(currentUrl, {
        headers: { Authorization: token },
      })
      .then((ats) => {
        // console.log('ats ===', ats);
        console.log('list', bookList);
        console.log('ats.data ===', ats.data);
        setBookList(bookList.filter((book) => book.book_id !== id));
        navigate('/books', { replace: true });
        toast.success(`Book is deleted`);
      })
      .catch((error) => {
        console.warn('handleDelete ivyko klaida:', error);
        console.warn('handleDelete ivyko klaida:', error.response);
      });
  }
  function handleEdit(id) {
    navigate(`/edit-book/${id}`);
  }

  function handleSeeMore(id) {
    navigate(`/one-book/${id}`);
  }

  const filteredBooks = useMemo(() => {
    return bookList.filter(
      (book) =>
        book.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        book.author.toLowerCase().includes(filterValue.toLowerCase()) ||
        book.description.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [bookList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container mx-auto max-w-[1200px] mx-5 my-5">
      <h1 className="text-4xl mb-4 text-center">Very Nice Book List</h1>
      <div className="mt-5 mb-5">
        <label htmlFor="filter" className="block text-m font-medium leading-6 text-gray-900">
          Search for a book ( author, title or <del>year</del>):
        </label>
        <input
          id="filter"
          name="filter"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          type="text"
          onChange={handleFilterChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 border-2 border-green-500 p-4">
        {filteredBooks.map((book) => (
          <div key={book.book_id} className="grid grid-cols-1 gap-2 border-2 border-green-100 justify-between p-3">
            <div className="">
              <img className="size-img block mx-auto" src={book.img_url} />
              <div className="py-2"></div>
              <div className="text-green-400 font-bold">{book.title}</div>
              <div className="py-2">by {book.author}</div>
              <div className="text-sm">Year: {book.year}</div>
              <div className="text-sm py-2">Description: {book.description}</div>

              <div className="flex gap-2">
                {isUserAdmin && (
                  <button
                    onClick={() => handleEdit(book.book_id)}
                    className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-4 rounded-md"
                  >
                    Edit
                  </button>
                )}
                {isUserAdmin && (
                  <button
                    onClick={() => handleDelete(book.book_id)}
                    className="bg-red-400 hover:bg-red-700 text-red-950 font-bold py-2 px-3 rounded-md"
                  >
                    Delete
                  </button>
                )}
                {isUserLoggedIn && (
                  <button
                    onClick={() => handleSeeMore(book.book_id)}
                    className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-3 rounded-md"
                  >
                    See more
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
