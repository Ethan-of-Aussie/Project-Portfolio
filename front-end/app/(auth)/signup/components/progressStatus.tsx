type ProgressStatusProp = {
    currentStep: number;
};

export default function ProgressStatus({
    currentStep,
}: ProgressStatusProp) {
    return (
        <div className="mb-3 flex justify-between">
            {[
                { number: 1, label: "Account" },
                { number: 2, label: "About You" },
                { number: 3, label: "Goals" },
            ].map((step) => (
                <div
                    key={step.number}
                    className="flex flex-col items-center gap-2"
                >
                    <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= step.number
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                            }`}
                    >
                        {currentStep > step.number ? (
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
                            step.number
                        )}
                    </div>
                    <span
                        className={
                            step.number === 1
                                ? "text-sm font-semibold text-green-700"
                                : "text-sm text-gray-500"
                        }
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    )
}