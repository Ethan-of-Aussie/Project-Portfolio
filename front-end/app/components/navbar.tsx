import Link from "next/link"

export default function NavBar() {
    return (
        <nav className="bg-green-700">
            <div className="flex items-center justify-between w-full px-6 text-white">
                <div>
                    <Link href={"/"}>Logo</Link>
                </div>
                <div className="flex gap-10 h-full">
                    <Link href={"/"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Home</Link>
                    <Link href={"/about"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">About</Link>
                    <Link href={"/login"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Login</Link>
                    <Link href={"/user"} className="self-stretch p-4 hover:bg-gray-200 hover:text-black">Profile</Link>
                </div>
            </div>
        </nav>
    )
}