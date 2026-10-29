"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";

export default function BottomNav() {
    const pathName = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 z-40 flex w-full justify-around border-t border-green-800 bg-green-700 px-2 py-2 shadow-md md:hidden">
            <Link href="/" className={`flex min-w-16 flex-col items-center gap-1 py-1 ${pathName === "/" ? "text-white border-b-2 border-white" : "text-green-200 border-b-2 border-transparent"}`}>
                <HomeIcon />
                <span>Home</span>
            </Link>
            <Link href="/user/dietPlan" className={`flex min-w-16 flex-col items-center gap-1 py-1 ${pathName === "/user/dietPlan" ? "text-white border-b-2 border-white" : "text-green-200 border-b-2 border-transparent"}`}>
                <RestaurantIcon />
                <span>Diet Plans</span>
            </Link>
            <Link href="/user" className={`flex min-w-16 flex-col items-center gap-1 py-1 ${pathName === "/user" ? "text-white border-b-2 border-white" : "text-green-200 border-b-2 border-transparent"}`}>
                <PersonIcon />
                <span>Profile</span>
            </Link>
        </nav>
    );
}