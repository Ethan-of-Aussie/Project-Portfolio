"use client"
import { api } from "@/lib/api"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Button from "@/app/components/button"
import user from "@/app/(main)/user/page"
import { CreateTableRequestType } from "@/lib/user/dietPlan"
import { useRouter } from 'next/navigation'
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context"
// import { cookies } from "next/headers"
export default function SignUpPage() {
    
    const router = useRouter()
    const [tableName, setTableName] = useState("")
    // Stores value entered in form fields

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        height: "",
        weight: "",
    })

    // Tracks form fields to display validation error
    

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        height: false,
        weight: false,
    })

    // Checks if the submit button has been clicked/tapped
    const [submitted, setSubmitted] = useState(false);

    // States for show/hide buttons in password field
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for checking which form is currently visible on screen
    const [currentStep, setCurrentStep] = useState(1)

    // State for displaying confirmation screen
    const [isComplete, setIsComplete] = useState(false)

    // State for controlling navigation animations for forms
    const [direction, setDirection] = useState(1)


    const onSubmitCreateUser = async () => {
        await api.post("api/v1/users/create", formData);
        console.log("Account created succesfully")
    }
    /*{const redirect = ({ req, res }) => {
        const cookie = await cookies()
  
        const url = cookie.get({ req, res}).redirectURL;
        if (!url) {
            cookie.set({req, res}, 'redirectURL', req.url)
        }
    }*/
    useEffect(() => {
        const card = cardRef.current;

        if (!card) {
            return;
        }

        card.classList.remove("step-enter");

        void card.offsetWidth;

        card.classList.add("step-enter")
    }, [currentStep]);

    const cardRef = useRef<HTMLDivElement>(null);


    function validateUsername(username: string) {
        if (!username.trim()) {
            return "Username is required."
        }

        return ""
    }

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

    function validateHeight(height: string) {
        if (!height) {
            return "Height is required."
        }

        const numericHeight = Number(height)

        if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
            return "Height must be a valid number greater than zero."
        }

        return ""
    }

    function validateWeight(weight: string) {
        if (!weight) {
            return "Weight is required."
        }

        const numericWeight = Number(weight)

        if (!Number.isFinite(numericWeight) || numericWeight < 1 || numericWeight > 500) {
            return "Weight must be between 1 and 500 kg."
        }

        return ""
    }

    function validateGoal(goal: string) {
        if (!goal) {
            return "Please select a goal."
        }

        return ""
    }

    // Bundling previous created validation funcions for reuse

    function validateAccountDetails() {
        return (
            validateUsername(formData.username) ||
            validateEmail(formData.email) ||
            validatePassword(formData.password) ||
            validateConfirmPassword(
                formData.password,
                formData.confirmPassword
            )
        )
    }

    // Next button validation

        


    function handleNext() {
        setSubmitted(true)

        if (currentStep === 1) {
            setTouched({
                ...touched,
                username: true,
                email: true,
                password: true,
                confirmPassword: true,
            })

            const accountError = validateAccountDetails()

            if (accountError) {
                return
            }

            setDirection(1)
            setCurrentStep(2)
        } else if (currentStep === 2) {
            setTouched({
                ...touched,
                height: true,
                weight: true,
            })

            const heightError = validateHeight(formData.height)
            const weightError = validateWeight(formData.weight)

            if (heightError || weightError) {
                return
            }

            setSubmitted(false)
            setIsComplete(true)
            
            // setDirection(1)
            // setCurrentStep(3)
        } {/* else if (currentStep === 3) {
             const goalError = validateGoal(formData.goal)

             if (goalError) {
               return
             }

            setIsComplete(true)

       */ }
    }

        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div
                    ref={cardRef}
                    className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl step-enter"
                    style={{
                        "--slide-from": direction === 1 ? "30px" : "-30px",
                    } as React.CSSProperties}>

                    <form noValidate autoComplete="off" className="mt-8 space-y-5" onSubmit={(event) => {
                        event.preventDefault()
                        setSubmitted(true)
                        setTouched({
                            ...touched,
                            email: true,
                            password: true,
                            confirmPassword: true,
                            height: true,
                            weight: true,
                        })

                        const emailError = validateEmail(formData.email)
                        const passwordError = validatePassword(formData.password)
                        const confirmPasswordError = validateConfirmPassword(
                            formData.password,
                            formData.confirmPassword
                        )
                        const heightError = validateHeight(formData.height)
                        const weightError = validateWeight(formData.weight)


                        if (emailError ||
                            passwordError ||
                            confirmPasswordError ||
                            heightError ||
                            weightError
                        ) {
                            return
                        }
                    }}>

                        {isComplete ? (
                            <div className="py-8 text-center">
                                <h2 className="text-2xl font-bold text-green-700">
                                    You&apos;re all set!
                                </h2>

                                <p className="mt-3 text-gray-600">
                                    Your sign-up details are ready.
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Account creation will be available once backend authentication is connected.
                                </p>
                            </div>
                        ) : (
                            <>

                                {/* Signup progress indicator */}
                                <div className="mb-8">

                                    <div className="mb-3 flex justify-between">
                                        {/* Step 1 */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep === 1
                                                    ? "bg-green-600 text-white"
                                                    : currentStep > 1
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {currentStep > 1 ? (
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            d="M4 10.5l4 4 8-9"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    1
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-green-700">
                                                Account
                                            </span>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep === 2
                                                    ? "bg-green-600 text-white"
                                                    : currentStep > 2
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {currentStep > 2 ? (
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            d="M4 10.5l4 4 8-9"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    2
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                About you
                                            </span>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep === 3
                                                    ? "bg-green-600 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                                    }`}>3
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                Goals
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* First form for username, email and password */}

                                {currentStep === 1 && (
                                    <div>
                                        <Link href="/">
                                            <h1 className="text-center text-3xl font-bold text-green-800 transition-transform duration-200 hover:scale-105">
                                                DietPlanner
                                            </h1>
                                        </Link>

                                        <p className="mt-2 text-center text-gray-600">
                                            Welcome! Please enter your details to create an account.
                                        </p>

                                        {/* Username Field */}

                                        <div className="mb-4">
                                            <label
                                                htmlFor="username"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Username
                                            </label>

                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="username"
                                                placeholder="Choose a username"
                                                required
                                                value={formData.username}
                                                onChange={(event) => {
                                                    const value = event.target.value
                                                    setFormData({ ...formData, username: value })
                                                }}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                            />
                                        </div>
                                        {touched.username && validateUsername(formData.username) && (
                                            <p className="mt-1 mb-4 text-sm text-red-600">
                                                {validateUsername(formData.username)}
                                            </p>
                                        )}

                                        {/* Email Field */}

                                        <div className="mb-4">
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
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                            />
                                            {submitted && touched.email && validateEmail(formData.email) && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {validateEmail(formData.email)}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password Field */}

                                        <div className="space-y-3">
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
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
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

                                            <label
                                                htmlFor="confirmPassword"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Confirm Password
                                            </label>

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
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
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
                                    </div>
                                )}

                                {/* Second form for height and weight */}

                                {currentStep === 2 && (
                                    <div>
                                        <div className="text-center">
                                            <h2 className="text-3xl font-bold text-green-800">
                                                About you
                                            </h2>
                                            <p className="mt-2 text-center text-gray-600">
                                                Add your height and weight to help personalise your plan.
                                            </p>
                                        </div>

                                        <div className="space-y-5">

                                            {/* Height Field */}

                                            <div>
                                                <label htmlFor="height" className="block text-sm mb-2 font-medium text-gray-700">
                                                    Height (cm)
                                                </label>

                                                <input
                                                    id="height"
                                                    name="height"
                                                    type="text"
                                                    inputMode="numeric"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                                    placeholder="Enter height"
                                                    value={formData.height}
                                                    onChange={(event) => {
                                                        const value = event.target.value

                                                        if (value !== "" && !/^\d+$/.test(value)) {
                                                            return
                                                        }

                                                        setFormData({ ...formData, height: value })

                                                        if (value === "") {
                                                            setTouched({ ...touched, height: false })
                                                        }
                                                    }}
                                                />

                                                {submitted && touched.height && validateHeight(formData.height) && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {validateHeight(formData.height)}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Weight Field */}

                                            <div>
                                                <label htmlFor="weight" className="block text-sm mb-2 font-medium text-gray-700">
                                                    Weight (kg)
                                                </label>

                                                <input
                                                    id="weight"
                                                    name="weight"
                                                    type="text"
                                                    inputMode="decimal"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                                    placeholder="Enter weight"
                                                    value={formData.weight}
                                                    onChange={(event) => {
                                                        const value = event.target.value

                                                        if (value !== "" && !/^\d+\.?\d*$/.test(value)) {
                                                            return
                                                        }

                                                        setFormData({ ...formData, weight: value })

                                                        if (value === "") {
                                                            setTouched({ ...touched, weight: false })
                                                        }
                                                    }}
                                                />

                                                {submitted && touched.weight && validateWeight(formData.weight) && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {validateWeight(formData.weight)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Third form for goals */}

                                {/* {currentStep === 3 && (
                                <div>
                                    <h2>Personal preferences</h2>
                                    <p>What is your main health or fitness goals?</p>

                                    <div className="mt-5 grid grid-cols-1 gap-3">
                                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${formData.goal === "lose"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                className="sr-only"
                                                value="lose"
                                                checked={formData.goal === "lose"}
                                                onClick={() => {
                                                    if (formData.goal === "lose") {
                                                        setFormData({
                                                            ...formData,
                                                            goal: "",
                                                        })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        goal: event.target.value,
                                                    })
                                                }}
                                            />
                                            <span>Lose weight</span>
                                            {formData.goal === "lose" && (
                                                <span className="ml-auto text-lg font-bold text-green-600">
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${formData.goal === "maintain"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                value="maintain"
                                                className="sr-only"
                                                checked={formData.goal === "maintain"}
                                                onClick={() => {
                                                    if (formData.goal === "maintain") {
                                                        setFormData({
                                                            ...formData,
                                                            goal: "",
                                                        })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        goal: event.target.value,
                                                    })
                                                }}
                                            />
                                            <span>Maintain weight</span>
                                            {formData.goal === "maintain" && (
                                                <span className="ml-auto text-lg font-bold text-green-600">
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${formData.goal === "gain"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                value="gain"
                                                className="sr-only"
                                                checked={formData.goal === "gain"}
                                                onClick={() => {
                                                    if (formData.goal === "gain") {
                                                        setFormData({
                                                            ...formData,
                                                            goal: "",
                                                        })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        goal: event.target.value,
                                                    })
                                                }}
                                            />
                                            <span>Gain weight</span>
                                            {formData.goal === "gain" && (
                                                <span className="ml-auto text-lg font-bold text-green-600">
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${formData.goal === "muscle"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                value="muscle"
                                                className="sr-only"
                                                checked={formData.goal === "muscle"}
                                                onClick={() => {
                                                    if (formData.goal === "muscle") {
                                                        setFormData({
                                                            ...formData,
                                                            goal: "",
                                                        })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        goal: event.target.value,
                                                    })
                                                }}
                                            />
                                            <span>Build muscle</span>
                                            {formData.goal === "muscle" && (
                                                <span className="ml-auto text-lg font-bold text-green-600">
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${formData.goal === "healthy"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                value="healthy"
                                                className="sr-only"
                                                checked={formData.goal === "healthy"}
                                                onClick={() => {
                                                    if (formData.goal === "healthy") {
                                                        setFormData({
                                                            ...formData,
                                                            goal: "",
                                                        })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        goal: event.target.value,
                                                    })
                                                }}
                                            />
                                            <span>Eat healthier</span>
                                            {formData.goal === "healthy" && (
                                                <span className="ml-auto text-lg font-bold text-green-600">
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    {submitted && validateGoal(formData.goal) && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {validateGoal(formData.goal)}
                                        </p>
                                    )}
                                </div>
                            )}*/}
                                {currentStep === 1 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                    >Next
                                    </Button>
                                ) : (
                                    <div className="flex w-full gap-3 pt-2">
                                        <div className="flex-1">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => {
                                                    setDirection(-1)
                                                    setCurrentStep(currentStep - 1)
                                                    setTouched({
                                                        ...touched,
                                                        height: false,
                                                        weight: false,
                                                    })
                                                }}>Back</Button>
                                        </div>
                                        <div className="flex-1">
                                            <Button type="button" onClick={() => {onSubmitCreateUser(); router.push('/')}}> {/*{handleNext}*/}
                                                {currentStep === 2 ? "Create Account" : "Next"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </form>
                </div>
            </main >
        )
    }