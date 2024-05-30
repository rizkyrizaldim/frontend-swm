import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('https://firm-hopefully-dolphin.ngrok-free.app/swmdepok/login/', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "ngrok-skip-browser-warning": "true",
        }
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email); // Store the user's email
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img src="https://git.antares.id/uploads/-/system/group/avatar/127/logo-antares.png" alt="Logo" className="mb-4 w-84 h-24" />
        <div className="bg-white p-8 rounded-lg shadow-md w-[25vw] flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Input
            type="email"
            placeholder="Email"
            className="mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
