import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToFooter }) => {
    const [nav, setNav] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleNav = () => {
        setNav(!nav);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
            <Link to='/' className='text-[#00df9a] text-3xl font-bold cursor-pointer'>
                BookTracker
            </Link>
            <ul className={`md:flex md:items-center md:gap-8 ${nav ? 'flex' : 'hidden'}`}>
                <li>
                    <Link to='/books' className='text-gray-700 hover:text-[#00df9a]'>
                        My Books
                    </Link>
                </li>
                {isAuthenticated && (
                    <li>
                        <Link to='/books/add' className='text-gray-700 hover:text-[#00df9a]'>
                            Add Book
                        </Link>
                    </li>
                )}
                {isAuthenticated ? (
                    <li>
                        <button onClick={handleLogout} className='text-gray-700 hover:text-[#00df9a]'>
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='text-gray-700 hover:text-[#00df9a]'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='text-gray-700 hover:text-[#00df9a]'>
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <div onClick={handleNav} className='md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
        </div>
    );
};

export default Navbar;
