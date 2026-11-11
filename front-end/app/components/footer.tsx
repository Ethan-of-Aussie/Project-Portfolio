import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-green-800 text-white">
      <div className="flex w-full items-center justify-between px-10 py-10">
        <div>
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        <div className="flex gap-8">
          <Link href="/" className="transition-colors hover:text-green-200">
            Home
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-green-200"
          >
            About
          </Link>

          <Link
            href="/login"
            className="transition-colors hover:text-green-200"
          >
            Login
          </Link>

          <Link href="/user" className="transition-colors hover:text-green-200">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
