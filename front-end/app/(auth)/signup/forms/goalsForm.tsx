import { validateGoal } from "@/lib/validations";

type GoalsFormProps = {
    goal: string;
    setGoal: (goal: string) => void;
    submitted: boolean;
};

export default function GoalsForm({
    goal,
    setGoal,
    submitted,
}: GoalsFormProps) {
    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-800">Personal preferences</h2>
                <p className="mt-2 text-gray-600">What is your main health or fitness goals?</p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">
                {[
                    { value: "lose", label: "Lose weight" },
                    { value: "maintain", label: "Maintain weight" },
                    { value: "gain", label: "Gain weight" },
                    { value: "muscle", label: "Build muscle" },
                    { value: "healthy", label: "Eat healthier" },
                ].map((option) => (
                    <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${goal === option.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-400"
                            }`}
                    >
                        <input
                            type="radio"
                            name="goal"
                            className="sr-only"
                            value={option.value}
                            checked={goal === option.value}
                            onClick={() => {
                                if (goal === option.value) {
                                    setGoal("");
                                }
                            }}
                            onChange={(event) => {
                                setGoal(event.target.value);
                            }}
                        />

                        <span>{option.label}</span>

                        {goal === option.value && (
                            <span className="ml-auto text-lg font-bold text-green-600">
                                ✓
                            </span>
                        )}
                    </label>
                ))}
            </div>

            {submitted && validateGoal(goal) && (
                <p className="mt-2 text-sm text-red-600">
                    {validateGoal(goal)}
                </p>
            )}
        </div>
    );
}
