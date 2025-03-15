import { useEffect } from "react";

const useHotkey = (keys: { ctrlKey?: boolean; shiftKey?: boolean; key: string }, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMatch =
                (keys.ctrlKey ? event.ctrlKey === keys.ctrlKey : true) &&
                (keys.shiftKey ? event.shiftKey === keys.shiftKey : true) &&
                event.key.toLowerCase() === keys.key.toLowerCase();

            if (isMatch) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [callback, keys]);
};

export default useHotkey;
