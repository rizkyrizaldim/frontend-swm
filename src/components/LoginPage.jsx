import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import axios from 'axios';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/swmdepok/login/`, {
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
        localStorage.setItem('userEmail', email);
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
            onKeyDown={handleKeyDown}
          />
          <div className="relative w-full mb-4">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>
          <div className="mt-4">
            <span>Don't have an account? </span>
            <button
              onClick={handleRegister}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
