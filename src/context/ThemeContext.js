import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Get stored theme or default to light
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme : 'light';
    });

    useEffect(() => {
        // Update localStorage whenever the theme changes
        localStorage.setItem('theme', theme);
        document.body.className = theme; // Update body class for global styles

    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };