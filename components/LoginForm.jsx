'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

const LoginForm = () => {
    const [errors, setErrors] = useState();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        })
        if(!result?.ok){
            setErrors(result?.error);
            return;
        }
        router.push("/profile");
    }
  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    required />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input 
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="******************"
                    id="password"
                    name="password"
                    required />
            </div>
            <div className="mb-6">
                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="password">
                    {errors}
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign In
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm
