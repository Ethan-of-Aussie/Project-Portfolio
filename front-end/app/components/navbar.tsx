
import Link from "next/link"

export default function NavBar() {
    return (
        <nav className="bg-green-700 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                <div className="col-span-full lg:col-start-1 lg:col-span-12">
                    <div className="flex items-center justify-between px-6 text-white">
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
                </div>
            </div>
        </nav>
    )
}
