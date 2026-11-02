"use client"
import { useState } from "react"
import Link from "next/link"
import Button from "@/app/components/button"
import { api } from "@/lib/api"
import { redirect } from "next/navigation"

export default function LoginPage() {

    // Stores value entered in form fields

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    // Tracks form fields to display validation error

    const [touched, setTouched] = useState({
        username: false,
        password: false,
    })

    // States for show/hide buttons in password field
    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function validateUsername(username: string) {
        if (!username.trim()) {
            return "Username is required."
        }

        return ""
    }

    function validatePassword(password: string) {
        if (!password) {
            return "Password is required."
        }

        return ""
    }

    const onSubmitLogin = async () => {
        const response = await api.post("/api/v1/users/login", formData);
        localStorage.setItem('access_token', response.data);
        if (response) {
            redirect("/")
        }
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


                <form noValidate autoComplete="off" className="mt-8 space-y-5" onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                    setTouched({
                        ...touched,
                        username: true,
                        password: true,
                    })

                    const usernameError = validateUsername(formData.username)
                    const passwordError = validatePassword(formData.password)

                    if (usernameError || passwordError) {
                        return
                    }
                }}>

                    {/* Username field */}

                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="username"
                            autoComplete="username"
                            placeholder="Enter your username"
                            required
                            value={formData.username}
                            onChange={(event) => {
                                const value = event.target.value
                                setFormData({ ...formData, username: value })

                                if (value === "") {
                                    setTouched({...touched, username: false})
                                }
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                        />
                        {submitted && touched.username && validateUsername(formData.username) && (
                            <p className="mt-2 text-sm text-red-600">
                                {validateUsername(formData.username)}
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

                    <Button onClick={onSubmitLogin}>Log In</Button>

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