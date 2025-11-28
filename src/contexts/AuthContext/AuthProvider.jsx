import React, { useEffect, useState } from 'react';
import { Auth } from '../../firebase/_firebase_init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(Auth, email, password);
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(Auth, email, password)
    }
    const loginWithGoogle = ()=>{
        return signInWithPopup(Auth, googleProvider)
    }
    const  signOutUser = () => {
        return signOut(Auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(Auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe();
    },[user])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        loginWithGoogle,
        signOutUser
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;