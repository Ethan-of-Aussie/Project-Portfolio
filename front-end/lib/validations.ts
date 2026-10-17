export function validateUsername(username: string) {
    if (!username.trim()) {
        return "Username is required."
    }

    return ""
}

export function validateEmail(email: string) {
    if (!email) {
        return "Email is required."
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address."
    }

    return ""
}

export function validatePassword(password: string) {
    if (!password) {
        return "Password is required."
    }

    return ""
}

export function validateConfirmPassword(
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

export function validateHeight(height: string) {
    if (!height) {
        return "Height is required."
    }

    const numericHeight = Number(height)

    if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
        return "Height must be a valid number greater than zero."
    }

    return ""
}

export function validateWeight(weight: string) {
    if (!weight) {
        return "Weight is required."
    }

    const numericWeight = Number(weight)

    if (!Number.isFinite(numericWeight) || numericWeight < 1 || numericWeight > 500) {
        return "Weight must be between 1 and 500 kg."
    }

    return ""
}

export function validateGoal(goal: string) {
    if (!goal) {
        return "Please select a goal."
    }

    return ""
}
