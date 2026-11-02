"use client"
import { api } from "@/lib/api"
import React, { useState, useEffect, useRef } from "react"
import {
    validateUsername, validateEmail, validatePassword, validateConfirmPassword,
    validateHeight, validateWeight,
    validateGoal
} from "@/lib/validations";
import AccountForm from "./forms/accountForm"
import PersonalDetailsForm from "./forms/personalDetailsForm"
import GoalsForm from "./forms/goalsForm"
import ProgressStatus from "./components/progressStatus"
import SignUpNav from "./components/signUpNav"



export default function SignUpPage() {
    
    // Stores value entered in form fields

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        height: "",
        weight: "",
        // goal: "",
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

    // State for checking which form is currently visible on screen
    const [currentStep, setCurrentStep] = useState(1)

    // State for displaying confirmation screen
    const [isComplete, setIsComplete] = useState(false)

    // State for controlling navigation animations for forms
    const [direction, setDirection] = useState(1)
    
    /*const onSubmitCreateUser = async () => {
        await api.post("api/v1/users/create", formData);
        console.log("Account created succesfully")
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

    const validateForm = () => {
        const userNameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        const confirmPasswordError = validateConfirmPassword(
            formData.password,
            formData.confirmPassword
        );

        const heightError = validateHeight(formData.height);
        const weightError = validateWeight(formData.weight);
       // const goalError = validateGoal(formData.goal);

        if (
            userNameError ||
            emailError ||
            passwordError ||
            confirmPasswordError ||
            heightError ||
            weightError // ||
           // goalError
        ) {
            return false;
        }

        return true;
    };

    // Next button validation

    async function handleNext() {
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

            await api.post("api/v1/users/create", formData);
            console.log("Account created succesfully")

            // setDirection(1)
            // setCurrentStep(3)
        } /* else if (currentStep === 3) {
            if (!validateForm()) {
                return
            }

            setIsComplete(true)
        }*/
    } 

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div
                ref={cardRef}
                className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl step-enter"
                style={{
                    "--slide-from": direction === 1 ? "30px" : "-30px",
                } as React.CSSProperties}
            >

                <form noValidate autoComplete="off" className="mt-8 space-y-5" onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                    setTouched({
                        ...touched,
                        username: true,
                        email: true,
                        password: true,
                        confirmPassword: true,
                        height: true,
                        weight: true,
                    })
                    if (!validateForm()) {
                        return;
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
                            <ProgressStatus currentStep={currentStep} />

                            {/* First form for username, email and password */}

                            {currentStep === 1 && (
                                <AccountForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    touched={touched}
                                    setTouched={setTouched}
                                    submitted={submitted}
                                />
                            )}

                            {/* Second form for height and weight */}

                            {currentStep === 2 && (
                                <PersonalDetailsForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    touched={touched}
                                    setTouched={setTouched}
                                    submitted={submitted}
                                />
                            )}

                            {/* Third form for goals */}

                            {/* {currentStep === 3 && (
                                <GoalsForm
                                    goal={formData.goal}
                                    setGoal={(goal) => {
                                        setFormData({ ...formData, goal })
                                    }}
                                    submitted={submitted}
                                />
                            )} */}

                            {/* Signup Form Nav buttons */}

                            <SignUpNav
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                handleNext={handleNext}
                                setDirection={setDirection}
                                touched={touched}
                                setTouched={setTouched}
                            />
                        </>
                    )}
                </form>
            </div>
        </main>
    )
    
}
