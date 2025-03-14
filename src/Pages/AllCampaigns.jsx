import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import { AuthContext } from "../Provider/AuthProvider";


const AllCampaigns = () => {
    const [campaign, setCampaign] = useState([])
    const {loading} = useContext(AuthContext)
    const [loader,setLoader] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/allCampaign')
            .then(res => res.json())
            .then(data => {
                setCampaign(data)
                console.log(loading)
                setLoader(false)

            })
            
    },[])
    const handleSort =()=>{
        const newData = [...campaign].sort((a,b)=>a.minimumDonationAmount - b.minimumDonationAmount)
        setCampaign(newData)
        console.log(campaign)
        console.log('sorted done')
    }
    
    if(loading || loader)
        return <Loading></Loading>
    return (
        <div>
            
            <div className="overflow-x-auto my-20">
                <div className="text-center">
                <button className="btn" onClick={handleSort}>Sort</button>
                </div>
                
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Campaign Title</th>
                            <th>Minimum amount</th>
                            <th>Deadline</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaign && campaign.map((single, indx) => 
                        <tr  key={indx}>
                            <th>{indx + 1}</th>
                            <td>{single.campaignTitle}</td>
                            <td>{single.minimumDonationAmount}</td>
                            <td>{single.deadline}</td>
                            <td><Link to={`/allCampaign/${single._id}`}><button className="btn  btn-xs">See more</button></Link></td>
                        </tr>)}


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllCampaigns;