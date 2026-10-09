"use client"
import { useState } from "react"
import Link from "next/link"
import Button from "@/app/components/button"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function validateEmail(email: string) {
        if (!email) {
            return "Email is required."
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address."
        }

        return ""
    }

    function validatePassword(password: string) {
        if (!password) {
            return "Password is required."
        }

        return ""
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <Link href="/">
                <h1 className="text-center text-3xl font-bold text-green-800 transition-transform duration-200 hover:scale-105">
                    DietPlanner
                </h1>
            </Link>

            <p className="mt-2 text-center text-gray-600">
            Welcome back! Please log in to your account.
            </p>

            
            <form noValidate className="mt-8 space-y-5" onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)

                const emailError = validateEmail(email)
                const passwordError = validatePassword(password)

                if (emailError || passwordError) {
                    return
                }
            }}>
                <div>
                    <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                    >
                    Email Address
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                    />
                    {submitted && validateEmail(email) && (
                    <p className="mt-2 text-sm text-red-600">
                        {validateEmail(email)}
                    </p>
                    )}
                </div>

                <div>
                    <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                    >
                    Password
                    </label>
                    <div className="relative">
                        <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                        />

                        {password && (
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 text-sm font-medium text-green-700 hover:text-green-900"
                            >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        )}
                    </div>
                    {submitted && validatePassword(password) && (
                    <p className="mt-2 text-sm text-red-600">
                        {validatePassword(password)}
                    </p>
                    )}
                    <div className="mt-4 text-center text-sm">
                        <span className="text-gray-600">
                            Forgot your password?{" "}
                        </span>
                        <Link
                            href="/forgot-password"
                            className="font-medium text-green-700 hover:text-green-900 hover:underline"
                        >
                            Click here
                        </Link>
                    </div>
                </div>

                <Button>Log In</Button>

                <p className="mt-5 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-green-700 hover:text-green-900 hover:underline"
                >
                    Sign up
                </Link>
                </p>

                <p className="mt-3 text-center text-sm text-gray-600">
                View as guest?{" "}
                <Link
                    href="/"
                    className="font-medium text-green-700 hover:text-green-900 hover:underline"
                >
                    Guest
                </Link>
                </p>
            </form>
        </div>
        </main>
  )
}