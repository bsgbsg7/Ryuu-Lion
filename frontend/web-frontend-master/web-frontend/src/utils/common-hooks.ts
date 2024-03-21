import { useCallback, useState } from "react";

export const useUpdate = () => {
    const [_, setState] = useState(0);
    return useCallback(() => {
        setState((num: number): number => num + 1);
    }, []);
};