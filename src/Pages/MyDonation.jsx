import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";



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
        <div>
            {donation?.length}
            {myData?.length}
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
            <div className="grid md:grid-cols-2 gap-4 border-amber-50">
                {
                    myData && myData.map((single, indx) =>
                        <div key={indx} className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src={single?.imageUrl}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{single?.campaignTitle}</h2>
                                <p>{single?.description}</p>

                            </div>
                        </div>
                    )
                }
            </div>



        </div>
    );
};

export default MyDonation;