import React, { useEffect, useState } from 'react';
import { Auth } from '../../firebase/_firebase_init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

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

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(Auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return unsubscribe();
    },[user])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,

    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;