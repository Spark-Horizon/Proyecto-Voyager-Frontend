import React, {useContext, useState, useEffect} from 'react';

import { auth, firestore } from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider ({ children, setUser }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true) 

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function signin(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function addDataToFirestore(collection, doc, data) {
        const userRef = firestore.collection(collection).doc(doc);
        return userRef.set(data);
    }
    
    function getDataFromFirestore(collection, doc) {
        const userRef = firestore.collection(collection).doc(doc);
        return userRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                return docSnapshot.data();
            } else {
                throw new Error("El documento no existe");
            }
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user !== null) {
                try {
                    setCurrentUser(user);
                    const userData = await getDataFromFirestore('users', user.uid);
                    setUser(userData);
                } catch (error) {
                    console.log('Error al obtener los datos del documento:', error);
                    setUser(null);
                }
            } else {
                setCurrentUser(null);
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe(); 
    }, [setUser, setCurrentUser, setLoading]);
    

    const value = {
        currentUser,
        signup,
        signin,
        logout,
        resetPassword,
        addDataToFirestore,
        getDataFromFirestore
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}