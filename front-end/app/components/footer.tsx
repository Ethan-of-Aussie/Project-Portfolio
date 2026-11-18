import Link from "next/link";
import Image from "next/image";
import demeter from "./navBar/demeter.webp";

export default function Footer() {
  return (
    <footer className="bg-[#356B43] px-6 py-4 text-white">
      <div className="w-full px-10 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold">
              <Image
                src={demeter}
                alt="DietPlanner"
                width={150}
                height={50}
                className="w-32 h-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-3 max-w-xs text-sm text-green-100">
              Planning your diet for a healthier life!
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/"
              className="text-white transition-colors hover:text-green-200"
            >
              Home
            </Link>

            <Link
              href="/user/dietPlan"
              className="text-white transition-colors hover:text-green-200"
            >
              My Diet Plans
            </Link>

            <Link
              href="/user"
              className="text-white transition-colors hover:text-green-200"
            >
              Profile
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-center text-xs text-green-100">
            © 2026 Demeter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
