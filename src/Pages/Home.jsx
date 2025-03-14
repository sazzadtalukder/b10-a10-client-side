import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeToggle from "../Components/ThemeToggle";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";

import { Tooltip } from "react-tooltip";
import Loading from "../Components/Loading";
// import './Home.css'
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
import SuccessStory from "../Components/SuccessStory";
const Home = () => {
    const { loading } = useContext(AuthContext)
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
    return (
        <div >

            <input type="checkbox" value="forest" className="toggle theme-controller mt-20" />
            <div >               
                <Slider></Slider>
                {/* Running campaign section */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-6">Running Campaign</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12">
                        {

                            running && running.map((data, indx) =>
                                <div key={indx} className="card bg-base-100  shadow-sm">
                                    <figure>
                                        <img
                                            src={data.imageUrl}
                                            alt="Campaign Poster"
                                            className="w-full h-40 object-cover rounded" />
                                    </figure>
                                    <div className=" ">
                                        <h2 className="card-title font-bold">{data.campaignTitle}</h2>
                                        <div className="text-start">
                                            <p><span className="font-semibold">Category:</span> <span className="px-1  bg-green-700 rounded font-bold">{data.option}</span></p>
                                            <p><span className="font-semibold">Deadline:</span> <span className="px-1  bg-red-700 rounded font-bold">{data.deadline}</span></p>
                                            <p> </p>
                                        </div>
                                        <p className="text-left"><span className="font-semibold">Minimum Donation:</span> USD $<span >{data.minimumDonationAmount}</span></p>


                                        <div className="card-actions justify-first">
                                            <Link to={`/allCampaign/${data._id}`}><button className="btn btn-primary">Details</button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
                <SuccessStory></SuccessStory>
            </div>



            {/* <Typewriter
                        words={['Welcome', 'to', 'our', 'site!']}

                    /> <br />
                    <a className="my-anchor-element">◕‿‿◕</a> <br />
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                        Hello world!
            </Tooltip> */}
        </div>
    );
};

export default Home;