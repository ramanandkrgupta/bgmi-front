import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://bgmi-tournament-v1.onrender.com/auth/login', formData);
            
            // Check if the token is present in the response
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login successful');
                navigate('/');
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            // Handle different types of errors
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('Unable to login. Please check your credentials and try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    name="identifier"
                    placeholder="Email/Mobile/Username"
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full mb-4"
                />
                <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
