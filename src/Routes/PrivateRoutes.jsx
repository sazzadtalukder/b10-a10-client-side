import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && user?.email)
        return children
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;