import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";



const MyDonation = () => {
    const { user ,loading} = useContext(AuthContext);
    const [loader,setLoader] = useState(true)
    // console.log(user)
    const [donation, setDonation] = useState([])
    useEffect(() => {
        fetch('https://crowdcube-server-blond.vercel.app/myDonation')
            .then(res => res.json())
            .then(data => {
                setDonation(data)
                // console.log(data)
                setLoader(false)

            })
    }, []);
    const myData = user && donation?.filter(cam => cam.email == user.email)

    if(loading || loader)
        return <Loading></Loading>
    return (
        <div className="my-20">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-amber-50 ">
                {
                    myData && myData.map((single, indx) =>
                        <div key={indx} className="card  bg-base-600  shadow-2xl">
                                <figure>
                                    <img
                                        src={single.imageUrl}
                                        alt="Campaign Poster" 
                                        className="w-full h-40 rounded object-cover"/>
                                </figure>
                                <div className=" ">
                                    <h2 className="card-title font-bold">{single.campaignTitle}</h2>
                                    <div className="text-start">
                                        <p><span className="font-semibold">Category:</span> <span className="px-1  bg-green-400 rounded">{single.option}</span></p>
                                        <p><span className="font-semibold">Deadline:</span> <span className="px-1  bg-red-400 rounded">{single.deadline}</span></p>
                                        <p> </p>
                                    </div>
                                    <p className="text-left"><span className="font-semibold">Minimum Donation:</span> USD $<span className="px-1 bg-amber-400 rounded">{single.minimumDonationAmount}</span></p>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyDonation;