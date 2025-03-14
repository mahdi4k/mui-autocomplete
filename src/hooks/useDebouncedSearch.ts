import { useMemo, useRef } from "react";
import debounce from "lodash.debounce";

export const useDebouncedSearch = (callback: (query: string) => void, delay = 500) => {
    const callbackRef = useRef(callback);

    // Update ref if callback changes
    callbackRef.current = callback;

    // useMemo for just not is make again debounce 
    return useMemo(
        () =>
            debounce((query: string) => callbackRef.current(query), delay),
        [delay] // Only recreate when delay changes
    );
};
