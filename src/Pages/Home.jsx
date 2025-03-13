import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeToggle from "../Components/ThemeToggle";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";

import { Tooltip } from "react-tooltip";
import Loading from "../Components/Loading";
import './Home.css'
const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { loading } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading>
    }


    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Set the className for the theme
    const themeClass = isDarkMode ? 'dark' : 'light';

    return (
        <div>
            <div className={`${themeClass}`}>
                <button onClick={toggleTheme} className="btn">
                    Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>
                <div>
                    <h1 >Welcome to the Home Page</h1>
                    <p>This is your homepage content.</p>
                    <Typewriter
                        words={['Welcome', 'to', 'our', 'site!']}

                    /> <br />
                    <a className="my-anchor-element">◕‿‿◕</a> <br />
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                        Hello world!
                    </Tooltip>
                </div>
            </div>




        </div>
    );
};

export default Home;