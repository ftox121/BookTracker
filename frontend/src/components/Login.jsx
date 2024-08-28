import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                navigate('/'); 
            } else {
                const data = await response.json();
                setError(data.detail || 'Login failed');
            }
        } catch (error) {
            setError('Network error');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center text-[#00df9a]'>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded'
                            required
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    <button
                        type='submit'
                        className='w-full bg-[#00df9a] text-white py-2 px-4 rounded hover:bg-[#00c89e]'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
