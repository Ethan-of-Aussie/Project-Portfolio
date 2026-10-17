import Button from "@/app/components/button";

type SignUpNavProps = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    handleNext: () => void;
    setDirection: (direction: number) => void;
    touched: {
        height: boolean;
        weight: boolean;
    };
    setTouched: React.Dispatch<
        React.SetStateAction<SignUpNavProps["touched"]>
    >
};

export default function SignUpNav({
    currentStep,
    setCurrentStep,
    handleNext,
    setDirection,
    touched,
    setTouched,
}: SignUpNavProps) {
    return (
        <div>
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
                            }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button
                            type="button"
                            onClick={handleNext}
                        >
                            {currentStep === 3 ? "Create Account" : "Next"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}