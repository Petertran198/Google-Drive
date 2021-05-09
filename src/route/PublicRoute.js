import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

//Public Routes are routes acts like a regular <Route/>
// the only difference is that if restricted === true that means that u cant go on to that page if the user is logged on
//...rest contains all the attributes passed in from <Route/> to our custom <PrivateRoute/> Example of attributes passed in are "exact, path, and location"
export default function PublicRoute({
    component: Component,
    restricted = false,
    ...rest
}) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                restricted === true && currentUser ? (
                    <Redirect to='./' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}
