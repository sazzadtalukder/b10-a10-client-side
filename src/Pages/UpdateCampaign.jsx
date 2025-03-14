import { useContext, useRef } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";


const UpdateCampaign = () => {
    const {user} = useContext(AuthContext)
        const myData = useLoaderData()
        const navigate = useNavigate()
        const selectRef = useRef(null)
        const handleSubmit =(e)=>{
            e.preventDefault();
            const form  = e.target
    
            const option = selectRef.current.value;
            const imageUrl = form.imageUrl.value
            const campaignTitle = form.campaignTitle.value
            const description = form.description.value
            const minimumDonationAmount = form.minimumDonationAmount.value
            const deadline  = form.deadline.value
            // const email = form.email.value
            // const name = form.name.value
            // console.log(imageUrl,campaignTitle,option,description,minimumDonationAmount,deadline,email,name)
            const updateCampaign = {imageUrl,campaignTitle,option,description,minimumDonationAmount,deadline};
            fetch(`https://crowdcube-server-blond.vercel.app/updateCampaign/${myData._id}`, {
                method: 'PUT',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(updateCampaign)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Data Updated Successfully',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                    })
                }
                navigate('/allCampaign')
                // console.log(data)
            })
        }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Image URL</label>
                            <input type="text" className="input" name='imageUrl' placeholder="Image URL" />
                            <label className="fieldset-label">Campaign title</label>
                            <input type="text" className="input" name='campaignTitle' placeholder="Campaign title" />
                            <label className="fieldset-label">Campaign type</label>
                            <select name="type" ref={selectRef} required className="w-full p-2 border rounded-md">
                                <option value="">Select Campaign Type</option>
                                <option value="Personal Issue">Personal Issue</option>
                                <option value="Startup">Startup</option>
                                <option value="Business">Business</option>
                                <option value="Creative Ideas">Creative Ideas</option>
                            </select>
                            <label className="fieldset-label">Description</label>
                            <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded-md h-24" />
                            <label className="fieldset-label">Minimum donation amount</label>
                            <input type="number" name='minimumDonationAmount' className="input" placeholder="Minimum donation amount" />
                            <label className="fieldset-label">Deadline</label>
                            <input type="date" name='deadline' className="input" placeholder="Deadline" />

                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" name='email' defaultValue={user?.email} readOnly />
                            <label className="fieldset-label">Name</label>
                            <input type="text" className="input" name='name' defaultValue={user?.displayName}  readOnly/>
                            <button className="btn btn-neutral mt-4">Update</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCampaign;