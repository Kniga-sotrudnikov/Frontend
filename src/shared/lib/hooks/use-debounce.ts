import {useState, useEffect} from "react";

export const useDebounce = <T, >(value: T, delay = 400):T => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timerID = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timerID);
    }, [value, delay]);
    return debounced;
}