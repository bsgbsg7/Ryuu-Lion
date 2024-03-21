import { useCallback, useEffect, useRef, useState } from "react";
const STORAGE_KEY = "myString"
export default () => {
    const [myString, setMyString] = useState<string>();
    useEffect(() => {
        const cache = localStorage.getItem(STORAGE_KEY);
        if (cache) {
            setMyString(cache);
        } else {
            setMyString(undefined);
        }

    }, [])
    const changeString = (v: string) => {
        setMyString(v);
        localStorage.setItem(STORAGE_KEY, v)
    }
    return {
        myString,
        changeString
    }
}