import React, {useContext, useState, useEffect} from 'react';

import { auth, firestore } from '../firebase/firebaseConfig';

// Se crea el contexto AuthContext
const AuthContext = React.createContext();

// Se exporta la función useAuth que utilizará el hook useContext para acceder al contexto
export function useAuth(){
    return useContext(AuthContext);
}

// En lugar de recibir setUser como una prop, ahora se define en este componente y se incluye en el valor del contexto
export function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState(null); // Este es el estado para el usuario de Firestore
    const [loading, setLoading] = useState(true);

    // Aquí se definen las funciones para interactuar con Firebase

    async function signup(email, password){
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

    async function addDataToFirestore(collection, doc, data) {
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

    // Este es el hook useEffect que se ejecuta cuando cambia el estado de autenticación del usuario
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user !== null) {
                try {
                    setCurrentUser(user); // Este es el usuario de Firebase
                    const userData = await getDataFromFirestore('users', user.uid); // Aquí se obtiene el usuario de Firestore
                    setUser(userData); // Aquí se guarda el usuario de Firestore en el estado
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
    
    // El valor que se pasa a través del contexto ahora incluye el usuario de Firestore
    const value = {
        currentUser,
        user,
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
