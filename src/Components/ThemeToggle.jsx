import React, { useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Set the className for the theme
    const themeClass = isDarkMode ? 'dark' : 'light';

    return (
        <div className={`${themeClass}`}>
            <button onClick={toggleTheme} className="btn">
                Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};

export default ThemeToggle;