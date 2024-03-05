import { useEffect, useState } from "react";

/**
 * Custom hook for debouncing a value.
 * Debounce search based on input text to mimimize network request on every character typed
 * @param {*} value - The input value to be debounced.
 * @param {number} delay - The delay in milliseconds for debouncing.
 * @returns {*} - The debounced value.
 */
const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Clean up the timeout on component unmount or when the value changes
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
