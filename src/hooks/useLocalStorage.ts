import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from "react";


export function useLocalStorage<T>(key : string, initialValue:T):  [T, Dispatch<SetStateAction<T>>]{
    const [storedValue, setStoredValue] = useState<T>(() =>{
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item): initialValue;
        }
        catch(error){
            console.error(`Ошибка загрузки ${key} из localStorage:`, error);
            return initialValue;
        }
    });

    const isFirstRender = useRef(true);
    useEffect(() =>{
    if(isFirstRender.current){
        isFirstRender.current= false;
        return;
    }
    try{
        localStorage.setItem(key, JSON.stringify(storedValue));
    }
    catch(error){
        console.error(`Ошибка сохранения ${key} в localStorage:`, error)
    }

    },[storedValue, key]);
    return [storedValue, setStoredValue];

}