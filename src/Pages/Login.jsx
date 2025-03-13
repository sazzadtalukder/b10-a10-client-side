import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const [error,setError] = useState('')
    const navigate  = useNavigate();
    const location = useLocation()
    const {loginUser,setUser,googleSignIn} = useContext(AuthContext)
    const handleGoogle =()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
        })
        .catch(er=>{
            console.log(er)
            
        })
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
       
        const email = form.email.value;
        const password = form.password.value;
        
        const newUser  = {email,password};
        loginUser(email,password)
        .then((result)=>{
            console.log(result.user)
            setUser(result.user)
            navigate(location?.state ? location.state : '/')
        })
        .catch(e=>{
            // setError({ ...error, login: e.code })
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: e.code,
                
              });
        })      
        console.log(newUser)
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="fieldset">
                                    
                                    <label className="fieldset-label">Email</label>
                                    <input name='email' type="email" className="input" placeholder="Email" />
                                    
                                    <label className="fieldset-label">Password</label>
                                    <input name='password' type="password" className="input" placeholder="Password" />
                                    {
                                    error.login &&
                                    <label className="label text-xs text-red-700">
                                        {error.login}
                                    </label> 
                                }
                                    <button className="btn btn-neutral mt-4" type='submit'>Login</button>
                                </fieldset>
                            </form>
                            <button className="btn" onClick={handleGoogle}>Sign in with Google </button>
                            <p>Don't have an account? please <Link to='/register' className="text-red-500">Register</Link></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;