import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and include at least one uppercase letter');
            return;
        }

        // API request
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/swmdepok/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Assuming a successful registration should navigate to the login page
            navigate('/login');
        } catch (error) {
            setError('Registration failed: ' + error.message);
        }
    };

    const handleLoginNavigate = () => {
        navigate('/login');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <img src="https://git.antares.id/uploads/-/system/group/avatar/127/logo-antares.png" alt="Logo" className="mb-4 w-84 h-24" />
                <div className="bg-white p-8 rounded-lg shadow-md w-[25vw] flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <Input 
                        type="email" 
                        placeholder="Fill your email here" 
                        className="mb-4 w-full" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                    <div className="relative w-full mb-4">
                        <Input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Fill your password here" 
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
                    <div className="relative w-full mb-4">
                        <Input 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            placeholder="Confirm password here" 
                            className="w-full" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
                        </button>
                    </div>
                    <button 
                        onClick={handleRegister} 
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200"
                    >
                        Register
                    </button>
                    <div className="mt-4">
                        <span>Already have an account? </span>
                        <button
                            onClick={handleLoginNavigate}
                            className="text-blue-500 hover:underline focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
