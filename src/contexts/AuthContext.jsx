import React, { useState, useContext } from 'react';

//First have to create the context
const AuthContext = React.createContext();

//Function you import inside other files to use this context
export const useAuth = () => {
    return useContext(AuthContext);
};

//Wrapper that allows the data/function pass from 'value' to be used anywhere
export function AuthProvider({ children }) {
    const value = {};

    // This is the function that makes it possible for value to be available to anyone inside the <AuthProvider></AuthProvider> container
    // For example if I wrap around index.js. whatever data/function is provided in 'value' will be available throughout the app
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
