import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const CampaignDetails = () => {
    const { user, loading } = useContext(AuthContext)
    const { id } = useParams();
    const [campaign, setCampaign] = useState([])
    const [loader,setLoader] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/addCampaign')
            .then(res => res.json())
            .then(data => {
                setCampaign(data);
                setLoader(false)

            })
    }, [])
    // console.log(campaign)
    // 
    const detailsData = campaign && campaign?.find(cam => cam._id == id)
    const option = detailsData?.option
    const imageUrl = detailsData?.imageUrl
    const campaignTitle = detailsData?.campaignTitle
    const description = detailsData?.description
    const minimumDonationAmount = detailsData?.minimumDonationAmount
    const deadline = detailsData?.deadline
    const name = user?.displayName;
    const email = user?.email
    const donatatedUser = { option, imageUrl, campaignTitle, description, minimumDonationAmount, deadline, name, email }
    console.log(donatatedUser)
    const handleDonation = () => {
        const todayDate = new Date().toISOString().split('T')[0]
        if (detailsData.deadline < todayDate) {
            console.log(detailsData.deadline, todayDate)
            console.log('it expired');
            Swal.fire({
                title: "No!",
                text: "Deadline is over",
                icon: "error"
            })
            return
        }
        fetch('http://localhost:5000/addDonation', {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(donatatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('getting data', data)
            })
    }
    if (loading || loader) {
        return <Loading></Loading>
    }
    return (
        <div>
            {
                detailsData &&
                <div className="hero bg-base-200 min-h-screen my-20">
                    <div className="flex gap-4 lg:items-center items-start  flex-col lg:flex-row px-0">
                        <img
                            src={detailsData?.imageUrl}
                            className="w-full lg:max-w-sm rounded-lg shadow-2xl object-cover" />
                        <div className='text-start px-0'>
                            <h1 className="text-5xl font-bold">{detailsData.campaignTitle}</h1>
                            <p className="py-6">
                                {detailsData.description}
                            </p>
                            <p><span className="font-semibold">Category:</span> <span className="px-1  bg-green-400 rounded">{detailsData.option}</span></p>
                                        <p><span className="font-semibold">Deadline:</span> <span className="px-1  bg-red-400 rounded">{detailsData.deadline}</span></p>
                                        <p> </p>
                                        <p className="text-left"><span className="font-semibold">Minimum Donation:</span> USD $<span className="px-1 bg-amber-400 rounded">{detailsData.minimumDonationAmount}</span></p>

                            <button className="btn btn-primary" onClick={handleDonation}>Donate</button>  <br /> <br />
                           
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CampaignDetails;