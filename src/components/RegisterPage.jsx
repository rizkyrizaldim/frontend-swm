import React from 'react'
import { Input } from './ui/input'

const RegisterPage = () => {
    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <img src="https://git.antares.id/uploads/-/system/group/avatar/127/logo-antares.png" alt="Logo" className="mb-4 w-84 h-24" />
                <div className="bg-white p-8 rounded-lg shadow-md w-[25vw] flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    <Input type="text" placeholder="Fill your name here" className="mb-4 w-full" />
                    <Input type="email" placeholder="Fill your email here" className="mb-4 w-full" />
                    <Input type="password" placeholder="Fill your password here" className="mb-4 w-full" />
                    <Input type="password" placeholder="Confirm password here" className="mb-4 w-full" />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200">
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
