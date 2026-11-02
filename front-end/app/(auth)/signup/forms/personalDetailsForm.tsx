
import { validateHeight, validateWeight } from "@/lib/validations";

type PersonalDetailsFormProps = {
    formData: {
        height: string;
        weight: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<PersonalDetailsFormProps["formData"]>
    >;
    touched: {
        height: boolean;
        weight: boolean;
    };
    setTouched: React.Dispatch<
        React.SetStateAction<PersonalDetailsFormProps["touched"]>
    >;
    submitted: boolean;
};

export default function PersonalDetailsForm({
    formData,
    setFormData,
    touched,
    setTouched,
    submitted,
}: PersonalDetailsFormProps) {
    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-800">
                    About you
                </h2>
                <p className="mt-2 text-gray-600">
                    Add your height and weight to help personalise your plan.
                </p>
            </div>

            <div className="space-y-5">
                {/* Height Field */}
                <div>
                    <label
                        htmlFor="height"
                        className="block text-sm mb-2 font-medium text-gray-700"
                    >
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
                            const value = event.target.value;

                            if (value !== "" && !/^\d+$/.test(value)) {
                                return;
                            }

                            setFormData({ ...formData, height: value });

                            if (value === "") {
                                setTouched({ ...touched, height: false });
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
                    <label
                        htmlFor="weight"
                        className="block text-sm mb-2 font-medium text-gray-700"
                    >
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
                            const value = event.target.value;

                            if (value !== "" && !/^\d+\.?\d*$/.test(value)) {
                                return;
                            }

                            setFormData({ ...formData, weight: value });

                            if (value === "") {
                                setTouched({ ...touched, weight: false });
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
    );
}
