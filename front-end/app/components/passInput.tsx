
"use client";

type PasswordInputProps = {
    id: string;
    name: string;
    value: string;
    visible: boolean;
    placeholder: string;
    autoComplete: string;
    onChange: (value: string) => void;
    onToggleVisibility: () => void;
};

export default function PasswordInput({
    id,
    name,
    value,
    visible,
    placeholder,
    autoComplete,
    onChange,
    onToggleVisibility,
}: PasswordInputProps) {
    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={visible ? "text" : "password"}
                autoComplete={autoComplete}
                placeholder={placeholder}
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />

            {value && (
                <button
                    type="button"
                    aria-label={visible ? "Hide password" : "Show password"}
                    onClick={onToggleVisibility}
                    className="absolute inset-y-0 right-3 text-sm font-medium text-green-700 hover:text-green-900"
                >
                    {visible ? "Hide" : "Show"}
                </button>
            )}
        </div>
    );
}
