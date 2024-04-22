'use client'

import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

const page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const userId = session?.user.user_id;
            const token = session?.user.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get(`https://express-auth-9qaq.onrender.com/user/${userId}`, config)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        if(status === "authenticated"){
            fetchUser();
        }
    }, []);

    if (status === "unauthenticated") {
        return router.push("/");
    }
    const logOut = async () => {
        signOut({redirect: false});
        router.push("/");
    }
  return (
    <div className='w-full flex align-middle'>
        {user ? (
            <>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                    <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
                    <p className="text-lg mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                    <p className="text-lg mb-4"><span className="font-semibold">Username:</span> {user.username}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                </div>
            </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
  )
}

export default page
