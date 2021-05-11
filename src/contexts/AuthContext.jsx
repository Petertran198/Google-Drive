import React, { useState, useContext, useEffect } from 'react';
//import the authentication module from firebase to use some of its function
import { auth } from '../auth/Firebase';

//First have to create the context
const AuthContext = React.createContext();

//Function you import inside other files to use this context
export const useAuth = () => {
    return useContext(AuthContext);
};

//Wrapper that allows the data/function pass from 'value' to be used anywhere
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // method that listens and runs when there is a change in the user's sign in state only triggered on sign-in or sign-out.
        const unsubscribe = auth.onAuthStateChanged(async (userAuthentication) => {
            setCurrentUser(userAuthentication);
            setLoading(false); // After everything is set up set loading to false so we can render the children component
        });

        // clean up
        return unsubscribe;
    }, []); // This will run atleast once when the components mounts even if there is a user or not. If no user currentUser is undefined

    const signUp = (email, password) => {
        //return promise if successful will sign up, so you got to async/await when used in different files
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email, password) => {
        //return promise if successful will login so you got to async/await when used in different files
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logOut = () => {
        return auth.signOut();
    };
    const value = { currentUser, signUp, login, logOut };

    // This is the function that makes it possible for value to be available to anyone inside the <AuthProvider></AuthProvider> container
    // For example if I wrap around index.js. whatever data/function is provided in 'value' will be available throughout the app
    return (
        <AuthContext.Provider value={value}>
            {/* The way firebase works is that it sets up our localstorage/sesssion/tokens for us and verify if there is a current logged in user,
            due to this there is an inital wait time where everything is undefined even if there is a current user so that is why we do not render the children components until firebase is done loading --IMPORTANT*/}
            {!loading && children}
        </AuthContext.Provider>
    );
}
