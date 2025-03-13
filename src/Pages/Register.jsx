import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Register = () => {
    const navigate = useNavigate()
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext)
    const [error, setError] = useState({})
    const checkingError = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return "";
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;

        const newUser = { name, email, photoUrl, password };
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                setUser(result.user)
                updateUserProfile({
                    displayName: name,
                    photoURL: photoUrl
                })
                .then(()=>{
                    
                })
                .catch()

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                    navigate(location?.state ? location.state : '/')
            })
            .catch(er => setError({ ...error, register: er.code }))
            
            

    }
    const handlePassword = (e) => {
        e.preventDefault();
        const newPassword = e.target.value;
        
        const er = checkingError(newPassword)
        setError({ ...error, password: er })
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Name</label>
                                    <input type="text" name='name' className="input" placeholder="Name" />
                                    <label className="fieldset-label">Email</label>
                                    <input name='email' type="email" className="input" placeholder="Email" />
                                    <label className="fieldset-label">Photo URL</label>
                                    <input name='photoUrl' type="text" className="input" placeholder="Photo URL" />
                                    <label className="fieldset-label">Password</label>
                                    <input onChange={handlePassword} name='password' type="password" className="input" placeholder="Password" />
                                    {
                                        error.password && <label className="label text-xs text-red-700">
                                            {error.password}
                                        </label>
                                        
                                    }
                                    {
                                        error.register &&
                                        <label className="label text-xs text-red-700">
                                            {error.register}
                                        </label>
                                    }
                                    <button className="btn btn-neutral mt-4" type='submit'>Register</button>
                                </fieldset>
                            </form>
                            <p>Already have an account? please <Link to='/login' className="text-red-500">login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;