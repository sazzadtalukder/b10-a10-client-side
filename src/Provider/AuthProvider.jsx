import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";
import { GoogleAuthProvider } from "firebase/auth";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const googleSignIn = ()=>{
        return signInWithPopup(auth,provider);
    }
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (updateData)=>{
        return updateProfile(auth.currentUser, updateData)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe();
        }
    })
    const authInfo = {
        createUser,loginUser,logOut,user,setUser,loading,updateUserProfile ,googleSignIn,setLoading
    }
   
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;