import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('No token found');
                const response = await axios.get('http://localhost:8000/api/books/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Error fetching books: ' + (error.response?.data?.detail || error.message));
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

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
            <h2 className="text-3xl font-bold mb-6 text-[#00df9a]">My Books</h2>
            <div className="mb-6">
                <Link to="/books/add" className="bg-[#00df9a] text-gray-800 py-3 px-6 rounded shadow hover:bg-[#00c471] transition duration-300">
                    Add New Book
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-gray-600 mt-2">Author: {book.author}</p>
                            <p className="text-gray-600 mt-1">Status: {book.status}</p>
                        </div>
                        <div className="bg-gray-100 p-4 text-center">
                            <Link
                                to={`/books/${book.id}`}
                                className="text-[#00df9a] hover:text-[#009e80] text-lg font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
