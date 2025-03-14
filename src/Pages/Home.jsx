import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeToggle from "../Components/ThemeToggle";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
// import groovyWalkAnimation from "./groovyWalk.json";
import { Tooltip } from "react-tooltip";
import Loading from "../Components/Loading";
// import './Home.css'
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
import SuccessStory from "../Components/SuccessStory";
const Home = () => {
    const { loading } = useContext(AuthContext)
    const [running, setRunning] = useState([]);
    const [loader, setLoader] = useState(true)
    const todayDate = new Date().toISOString().split('T')[0]
    useEffect(() => {
        fetch('http://localhost:5000/allCampaign')
            .then(res => res.json())
            .then(data => {
                const runningCampaign = data && data.filter(run => run.deadline >= todayDate)
                setRunning(runningCampaign);
                setLoader(false)
            })
    }, [])
    console.log(running)
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div >
            <p className="font-bold text-5xl my-10"><Typewriter
                words={['Welcome', 'to', 'our', 'site!']}
                loop={100}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={10}
            /></p>
            <Tooltip id="my-tooltip" />
            <input type="checkbox" value="forest" className="toggle theme-controller " data-tooltip-id="my-tooltip"
                data-tooltip-content="Toggle Theme!"
                data-tooltip-place="top" />
            <div >
                <Slider></Slider>
                {/* Running campaign section */}

                <section>

                    <br />
                    <h2 className="text-3xl font-bold text-center mb-6" data-tooltip-id="my-tooltip"
                        data-tooltip-content="Running Campaign!"
                        data-tooltip-place="top">Running Campaign</h2>
                    {loader ? <Loading></Loading> :
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
                    }
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