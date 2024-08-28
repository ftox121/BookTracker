import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Want to Read');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/books/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(response => {
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setStatus(response.data.status);
        })
        .catch(error => {
          console.error('Error fetching book:', error);
          setError('Error fetching book details.');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !status) {
        setError('All fields are required');
        return;
    }
    const bookData = { title, author, status };
    const endpoint = id ? `http://localhost:8000/api/books/${id}/` : 'http://localhost:8000/api/books/';
    const method = id ? 'put' : 'post';

    axios[method](endpoint, bookData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
    .then(() => navigate('/'))
    .catch(error => setError('Error saving book: ' + (error.response?.data?.detail || error.message)));
};

  return (
    <div className="max-w-[1240px] mx-auto px-4">
      <h2 className="text-2xl font-bold my-6">{id ? 'Edit Book' : 'Add New Book'}</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="md:text-2xl text-xl font-bold text-gray-500">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="md:text-2xl text-xl font-bold text-gray-500">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="md:text-2xl text-xl font-bold text-gray-500">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 rounded-md">
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>
        <button type="submit" className="bg-[#00df9a] text-white py-2 px-4 rounded">{id ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default BookForm;
