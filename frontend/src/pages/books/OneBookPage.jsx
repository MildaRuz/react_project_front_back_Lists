import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useAPIData from '../../hooks/useAPIData';
import { useAuthContext } from '../../store/AuthCtxtProvider';

const booksUrl = 'http://localhost:3000/api/books';

export default function OneBookPage() {
  const { isUserAdmin, isUserLoggedIn } = useAuthContext();

  const { book_id } = useParams();

  const [bookList, setBookList] = useAPIData(`${booksUrl}/${book_id}`);
  const [reserved, setReserved] = useState('');

  const navigate = useNavigate();

  function handleReserveBook(id) {
    navigate('/user-reserved-books-list');
    setReserved(...reserved, id);
  }

  return (
    <div className="container mx-5 my-5">
      <div className="grid grid-cols-1 max-w-[50%] border-2 border-green-500 p-4">
        <div key={bookList.book_id} className="grid grid-cols-1 gap-2 justify-between p-3">
          <div className="">
            <img className="size-img block mx-auto" src={bookList.img_url} />
            <div className="py-2"></div>
            <div className="text-base">
              <strong className="text-green-400">{bookList.title}</strong>
            </div>
            <div className="py-2">by {bookList.author}</div>
            <div className="text-sm">Year: {bookList.year}</div>
            <div className="text-sm py-2">Description: {bookList.description}</div>
          </div>
        </div>
        {isUserLoggedIn && (
          <div className="flex gap-2">
            <button
              onClick={() => handleReserveBook(bookList.book_id)}
              className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-4 ml-2 rounded-md"
            >
              Reserve this book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
