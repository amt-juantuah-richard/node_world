import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';

type ThemeMode = string;
type ThemeContextProps = {
    theme: ThemeMode;
    themeSet: (theme: ThemeMode) => void;
    themeToggler: () => void;
    [key:string]: any;
}
export const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    themeSet: (_theme: ThemeMode) => {},
    themeToggler: () => {}
});

const ThemeProvider:React.FC<PropsWithChildren> = ({children}:any) => {
    
    const [theme, themeSet] = useState<ThemeMode>("");

    useEffect(() => {
        const getPresentTheme = () => {
            const persistedTheme = localStorage.getItem("theme")

            if (persistedTheme === "light") {
                themeSet(persistedTheme)
                document.body.classList.remove("dark");
                document.body.classList.add("light");
            } else if (persistedTheme === "dark") {
                themeSet(persistedTheme)
                document.body.classList.add("dark");
                document.body.classList.remove("light");
            }
        };
        getPresentTheme();
    },[])

    useEffect(() => {
        const setThemeToStorage = () => {
            localStorage.setItem("theme", theme);

            if (theme === "light") {
                // console.log(theme, "is working")
                // document.body.classList.toggle("dark");
                document.body.classList.remove("dark");
                document.body.classList.add("light");
            } else {
                // console.log(theme, "is not working")
                // document.body.classList.toggle("light");
                document.body.classList.remove("light");
                document.body.classList.add("dark");
            }
        };
        setThemeToStorage();
    }, [theme])

    const themeToggler = () => {
        themeSet(theme === "dark" ? "light" : "dark");
    };

    return (
        <ThemeContext.Provider
            value={{theme, themeSet, themeToggler}}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;