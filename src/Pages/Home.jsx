import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeToggle from "../Components/ThemeToggle";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";

import { Tooltip } from "react-tooltip";
import Loading from "../Components/Loading";
import './Home.css'
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
const Home = () => {
    const { loading } = useContext(AuthContext)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [running, setRunning] = useState([]);
    const todayDate = new Date().toISOString().split('T')[0]
    useEffect(() => {
        fetch('http://localhost:5000/allCampaign')
            .then(res => res.json())
            .then(data => {
                const runningCampaign = data && data.filter(run => run.deadline >= todayDate)
                setRunning(runningCampaign);

            })
    }, [])
    console.log(running)
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
            {/* <div className={`${themeClass}`}>
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
            </div> */}


            <Slider></Slider>
            {/* Running campaign section */}
            <section>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {

                        running && running.map((data, indx) =>
                            <div key={indx} className="card bg-base-100 w-76 shadow-sm">
                                <figure>
                                    <img
                                        src={data.imageUrl}
                                        alt="Campaign Poster" />
                                </figure>
                                <div className=" ">
                                    <h2 className="card-title font-bold">{data.campaignTitle}</h2>
                                    <div className="text-start">
                                        <p><span className="font-semibold">Category:</span> <span className="px-1  bg-green-400 rounded">{data.option}</span></p>
                                        <p><span className="font-semibold">Deadline:</span> <span className="px-1  bg-red-400 rounded">{data.deadline}</span></p>
                                        <p> </p>
                                    </div>
                                    <p className="text-left"><span className="font-semibold">Minimum Donation:</span> USD $<span className="px-1 bg-amber-400 rounded">{data.minimumDonationAmount}</span></p>


                                    <div className="card-actions justify-first">
                                        <Link to={`/allCampaign/${data._id}`}><button className="btn btn-primary">Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;