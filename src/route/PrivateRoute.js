import React from 'react';
import { Redirect, Route, Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

//Private Routes are routes only allowed to be access if logged in
//...rest contains all the attributes passed in from <Route/> to our custom <PrivateRoute/> Example of attributes passed in are "exact, path, and location"
export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? <Component {...props} /> : <Redirect to='./signin' />
            }
        />
    );
}
