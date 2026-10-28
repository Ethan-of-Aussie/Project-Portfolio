"use client"
import { useEffect, useState } from "react";
import Link from "next/link"

export default function NavBar() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    
    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.reload();
    }

    return (
        <nav className="bg-green-700 mx-auto">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                <div className="col-span-full lg:col-start-1 lg:col-span-12">
                    <div className="flex items-center justify-between px-6 text-white">
                        <div>
                            <Link href={"/"}>Logo</Link>
                        </div>
                        <div className="flex gap-10 h-full">
                            <Link href={"/"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Home</Link>
                            <Link href={"/about"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">About</Link>
                            <Link href={"/user"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Profile</Link>
                            {accessToken ? (
                                <button onClick={handleLogout} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Logout</button>
                            ) : (
                            <Link href={"/login"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
