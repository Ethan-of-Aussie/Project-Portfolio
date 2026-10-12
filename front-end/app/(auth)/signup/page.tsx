"use client"
import { useState } from "react"
import Link from "next/link"
import Button from "@/app/components/button"

export default function LoginPage() {

    // Stores value entered in form fields

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    // Tracks form fields to display validation error

    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    })

    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    function validateConfirmPassword(
        password: string,
        confirmPassword: string
    ) {
        if (!confirmPassword) {
            return "Please confirm your password."
        }

        if (password !== confirmPassword) {
            return "Passwords do not match."
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
                    Welcome! Please enter your details to create an account.
                </p>


                <form noValidate autoComplete="off" className="mt-8 space-y-5" onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                    setTouched({
                        ...touched,
                        email: true,
                        password: true,
                        confirmPassword: true,
                    })

                    const emailError = validateEmail(formData.email)
                    const passwordError = validatePassword(formData.password)

                    if (emailError || passwordError) {
                        return
                    }
                }}>

                    {/* Email Field */}

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
                            value={formData.email}
                            onChange={(event) => {
                                const value = event.target.value
                                setFormData({ ...formData, email: value })

                                if (value === "") {
                                    setTouched({ ...touched, email: false })
                                }
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                        />
                        {submitted && touched.email && validateEmail(formData.email) && (
                            <p className="mt-2 text-sm text-red-600">
                                {validateEmail(formData.email)}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}

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
                                value={formData.password}
                                onChange={(event) => {
                                    const value = event.target.value
                                    setFormData({ ...formData, password: value })

                                    if (value === "") {
                                        setTouched({ ...touched, password: false })
                                    }
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            />

                            {formData.password && (
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

                        {submitted && touched.password && validatePassword(formData.password) && (
                            <p className="mt-2 text-sm text-red-600">
                                {validatePassword(formData.password)}
                            </p>
                        )}

                        {/* Confirm Password Field */}

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirmPassword}
                                onChange={(event) => {
                                    const value = event.target.value
                                    setFormData({ ...formData, confirmPassword: value })

                                    if (value === "") {
                                        setTouched({ ...touched, confirmPassword: false })
                                    }
                                }}
                                className="w-full rounded-lg border border-gray-300 my-4 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            />

                            {formData.confirmPassword && (
                                <button
                                    type="button"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 text-sm font-medium text-green-700 hover:text-green-900"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            )}
                        </div>

                        {submitted &&
                            touched.confirmPassword &&
                            validateConfirmPassword(
                                formData.password,
                                formData.confirmPassword
                            ) && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validateConfirmPassword(
                                        formData.password,
                                        formData.confirmPassword
                                    )}
                                </p>
                            )}
                    </div>

                    <Button>Sign up</Button>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-green-700 hover:text-green-900 hover:underline"
                        >
                            Log In
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