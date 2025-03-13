import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const CampaignDetails = () => {
    const {user,loading,setLoading} = useContext(AuthContext)
    const { id } = useParams();
    const [campaign, setCampaign] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/addCampaign')
            .then(res => res.json())
            .then(data => {
                setCampaign(data);
                setLoading(false)

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
     const deadline  = detailsData?.deadline
    const name = user?.displayName;
    const email = user?.email
    const donatatedUser = {option,imageUrl,campaignTitle,description,minimumDonationAmount,deadline,name,email}
    console.log(donatatedUser)
    const handleDonation =()=>{
        const todayDate = new Date().toISOString().split('T')[0]
        if(detailsData.deadline < todayDate){
            console.log(detailsData.deadline,todayDate)
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
             console.log('getting data',data)
        })
    }
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            {
                detailsData && 
                <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={detailsData?.imageUrl}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{detailsData.campaignTitle}</h1>
                        <p className="py-6">
                           {detailsData.description}
                        </p>
                       
                            <p>Campaign Type: <span className='bg-green-400 rounded text-white font-bold'>{detailsData.option}</span></p>
                            <p>Minimum Donation Amount: <span>{detailsData.minimumDonationAmount}$</span></p>
                        
                        <button className="btn btn-primary" onClick={handleDonation}>Donate</button> 
                        <Link to='/myDonation'><button className="btn btn-primary" >My All Donation</button></Link>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default CampaignDetails;