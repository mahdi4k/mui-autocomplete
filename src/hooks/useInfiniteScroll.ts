import { useCallback } from "react";

export const useInfiniteScroll = (callback: () => void, isFetching: boolean, hasMore: boolean) => {

    // ✅ useCallback memoizes the function reference to prevent unnecessary re-creation.
    // ❌ useMemo is used for memoizing values (objects, arrays, primitives) and is not suitable for functions.
    return useCallback(
        (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching && hasMore) {
                callback();
            }
        },
        [callback, isFetching, hasMore]
    );
};
