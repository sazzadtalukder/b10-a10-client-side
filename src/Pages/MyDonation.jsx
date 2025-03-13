import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";



const MyDonation = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [donation, setDonation] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/myDonation')
            .then(res => res.json())
            .then(data => {
                setDonation(data)
                console.log(data)

            })
    }, []);
    const myData = user && donation?.filter(cam => cam.email == user.email)


    return (
        <div className="my-20">
            
            {/* <div className="overflow-x-auto">
                <table className="table">
                  
                    <thead>
                        <tr>
                            <th></th>
                            <th>Campaign Title</th>
                            <th>Deadline</th>
                            <th>Category</th>

                        </tr>
                    </thead>
                    <tbody>
                        {myData && myData.map((single, indx) =>
                            <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{single.campaignTitle}</td>
                                <td>{single.deadline}</td>
                                <td>{single.option}</td>

                            </tr>)}


                    </tbody>
                </table>
            </div> */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-amber-50 ">
                {
                    myData && myData.map((single, indx) =>
                        <div key={indx} className="card bg-base-100 w-76 shadow-sm">
                                <figure>
                                    <img
                                        src={single.imageUrl}
                                        alt="Campaign Poster" />
                                </figure>
                                <div className=" ">
                                    <h2 className="card-title font-bold">{single.campaignTitle}</h2>
                                    <div className="text-start">
                                        <p><span className="font-semibold">Category:</span> <span className="px-1  bg-green-400 rounded">{single.option}</span></p>
                                        <p><span className="font-semibold">Deadline:</span> <span className="px-1  bg-red-400 rounded">{single.deadline}</span></p>
                                        <p> </p>
                                    </div>
                                    <p className="text-left"><span className="font-semibold">Minimum Donation:</span> USD $<span className="px-1 bg-amber-400 rounded">{single.minimumDonationAmount}</span></p>


                                    <div className="card-actions justify-first">
                                        {/* <Link to={`/allCampaign/${single._id}`}><button className="btn btn-primary">Details</button></Link> */}
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>



        </div>
    );
};

export default MyDonation;