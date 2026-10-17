import { useState } from "react";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from "@/lib/validations";
import Link from "next/link";
import PasswordInput from "@/app/components/passInput";

type AccountFormProps = {
    formData: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        height: string;
        weight: string;
        goal: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<AccountFormProps["formData"]>
    >;

    touched: {
        username: boolean;
        email: boolean;
        password: boolean;
        confirmPassword: boolean;
        height: boolean;
        weight: boolean;
    };
    setTouched: React.Dispatch<
        React.SetStateAction<AccountFormProps["touched"]>
    >;

    submitted: boolean;
};

export default function AccountForm({
    formData,
    setFormData,
    touched,
    setTouched,
    submitted,
}: AccountFormProps) {
    // States for show/hide buttons in password field
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
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
                        onChange={(event) =>
                            setFormData({ ...formData, username: event.target.value })
                        }
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

                    <PasswordInput
                        id="password"
                        name="password"
                        value={formData.password}
                        visible={showPassword}
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        onChange={(value) => {
                            setFormData({ ...formData, password: value });

                            if (value === "") {
                                setTouched({ ...touched, password: false });
                            }
                        }}
                        onToggleVisibility={() => setShowPassword(!showPassword)}
                    />

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

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        visible={showConfirmPassword}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        onChange={(value) => {
                            setFormData({ ...formData, confirmPassword: value });

                            if (value === "") {
                                setTouched({ ...touched, confirmPassword: false });
                            }
                        }}
                        onToggleVisibility={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    />

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
        </div>
    )
}