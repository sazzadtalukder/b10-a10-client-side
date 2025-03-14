import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
// import './Nav.css'

const Navbar = () => {

    const { user, logOut ,loading} = useContext(AuthContext)

    const handleOut = () => {
        logOut()
            .then(() => {
                // console.log('Successfully logOut')
            })
            .catch()
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                            <NavLink to='/' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>Home</NavLink>
                            <NavLink to='/allCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>All Campaign</NavLink>
                            <NavLink to='/addCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>Add Campaign</NavLink>
                            <NavLink to='/myCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>My Campaign</NavLink>
                        <NavLink to='/myDonation' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>My Donation</NavLink>
                            
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Crowdcube</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <NavLink to='/' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>Home</NavLink>
                        <NavLink to='/allCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>All Campaign</NavLink>
                        <NavLink to='/addCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>Add Campaign</NavLink>
                        <NavLink to='/myCampaign' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>My Campaign</NavLink>
                        <NavLink to='/myDonation' className={({ isActive }) =>
                            `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        }>My Donation</NavLink>
                        
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user && user?.email ?
                            <div className="flex  items-center relative group">
                                <div className="">
                                    {loading  ? <h2>loading</h2> : <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />}
                                    
                                </div>
                                <div className="absolute bottom-12  left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                    {user.displayName}
                                </div>
                                <button className="btn ml-4" onClick={handleOut}>Log Out</button>
                            </div>
                            :
                            <div>
                                <NavLink className={({ isActive }) =>
                            `btn ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        } to='/login'>Login </NavLink>  <NavLink className={({ isActive }) =>
                            `btn ${isActive ? "bg-blue-500 text-white" : "text-gray-500"
                            }`
                        } to='/register'>Register </NavLink>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;