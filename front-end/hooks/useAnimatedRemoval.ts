import { useState } from "react";
import type { ExternalConsumable } from "@/lib/user/dietPlan";

export default function useAnimatedRemoval() {
    const [removingCodes, setRemovingCodes] = useState<string[]>([]);
    const animateRemoval = (
        item: ExternalConsumable,
        removeItem: (item: ExternalConsumable) => void
    ) => {
        setRemovingCodes((prev) => [...prev, item.code]);
        setTimeout(() => {
            removeItem(item);
            setRemovingCodes((prev) =>
                prev.filter((code) => code !== item.code)
            );
        }, 200);
    };
    return {
        removingCodes,
        animateRemoval,
    };
}