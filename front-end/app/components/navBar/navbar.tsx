"use client"
import { useEffect, useState } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close";

export default function NavBar() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
    }, [])

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.reload();
    }

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-green-700 py-2 md:left-1/2 md:w-[90%] md:-translate-x-1/2">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                <div className="col-span-full lg:col-start-1 lg:col-span-12 flex items-center justify-between px-4 py-3 text-white">
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href={"/"} className="md:ml-6">Logo</Link>
                        <button
                            type="button"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                    <div className="hidden md:flex gap-10 h-full">
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

            <>
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setIsMenuOpen(false)}
                    className={`fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 md:hidden ${isMenuOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                        }`}
                />

                <div
                    className={`fixed right-0 inset-y-0 z-[60] w-72 max-w-[85vw]
                            bg-green-700 px-4 pb-4 pt-6 
                            text-white shadow-xl 
                            transition-transform duration-300 ease-in-out md:hidden 
                            ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close navigation menu"
                        className="mb-4 flex w-full justify-end p-2"
                    >
                        <CloseIcon />
                    </button>
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className={`block rounded-md px-3 py-3 ${pathName === "/"
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-600"
                        }`}>Home</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`block rounded-md px-3 py-3 ${pathName === "/about"
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-600"
                        }`}>About</Link>
                    <Link href="/user" onClick={() => setIsMenuOpen(false)} className={`block rounded-md px-3 py-3 ${pathName === "/user"
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-600"
                        }`}>Profile</Link>
                    {accessToken ? (
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLogout();
                            }}
                            className={`block rounded-md px-3 py-3 ${pathName === "/"
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-600"
                        }`}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className={`block rounded-md px-3 py-3 ${pathName === "/login"
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-600"
                        }`}>Login</Link>
                    )}
                </div>
            </>
        </nav>
    )
}
