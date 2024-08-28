import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('Want to Read');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('No token found');
                const response = await axios.get(`http://localhost:8000/api/books/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBook(response.data);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Error fetching book: ' + (error.response?.data?.detail || error.message));
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('No token found');
            await axios.put(`http://localhost:8000/api/books/${id}/`, {
                title,
                author,
                status,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBook({ ...book, title, author, status });
            setEditMode(false);
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Error updating book: ' + (error.response?.data?.detail || error.message));
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('No token found');
            await axios.delete(`http://localhost:8000/api/books/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/books');
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Error deleting book: ' + (error.response?.data?.detail || error.message));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {book ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h2>
                    {editMode ? (
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-600">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Author</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="Want to Read">Want to Read</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Read">Read</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#00df9a] text-white py-2 px-4 rounded mr-2"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-2">Author: <span className="font-normal">{book.author}</span></p>
                            <p className="text-lg font-semibold text-gray-700">Status: <span className="font-normal">{book.status}</span></p>
                            <div className="mt-4">
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-[#00df9a] text-white py-2 px-4 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-700">No book found</p>
            )}
        </div>
    );
};

export default BookDetail;
