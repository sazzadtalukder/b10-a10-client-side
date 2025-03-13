import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyCampaign = () => {
    
    const { user } = useContext(AuthContext);
    console.log(user)
    const [campaign, setCampaign] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allCampaign')
            .then(res => res.json())
            .then(data => {
                setCampaign(data)
                // console.log(campaign)

            })
    }, []);
    const myData = user && campaign?.filter(cam => cam.email == user.email)
    // const handleUpdate = () => {
    //     console.log('updated')
    // }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/myCampaign/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            console.log(data)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Campaign has been deleted.",
                                icon: "success"
                            });
                            const remainingCampaign = campaign.filter(cam=>cam._id != id)
                            setCampaign(remainingCampaign)
                        }
                    })

            }
        });
    }
    return (
        <div>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Campaign Title</th>
                            <th>Deadline</th>
                            <th>Category</th>
                            <th>CRUD</th>

                        </tr>
                    </thead>
                    <tbody>
                        {myData && myData.map((single, indx) =>
                            <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{single.campaignTitle}</td>
                                <td>{single.deadline}</td>
                                <td>{single.option}</td>
                                <td><Link to={`/updateCampaign/${single._id}`}><button className="btn btn-ghost btn-xs">Update</button></Link> <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(single._id)}>Delete</button></td>
                            </tr>)}


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyCampaign;