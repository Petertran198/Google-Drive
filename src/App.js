import React from 'react';
// remember npm install react-router-dom
import { Switch } from 'react-router-dom';
import PublicRoute from './route/PublicRoute';
import PrivateRoute from './route/PrivateRoute';
import SignUp from './components/auth/SignUp';
import Profile from './components/auth/Profile';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import UpdateProfile from './components/auth/UpdateProfile';
import Header from './components/header/Header';
import Dashboard from './components/google-drive/Dashboard';

export default function App() {
    return (
        <>
            <Header />
            <Switch>
                {/* Authentication */}
                <PublicRoute
                    exact
                    path='/signup'
                    restricted={true}
                    component={SignUp}
                />
                <PublicRoute
                    exact
                    path='/login'
                    restricted={true}
                    component={Login}
                />
                <PublicRoute
                    exact
                    path='/forgot-password'
                    component={ForgotPassword}
                />
                {/* User */}
                <PrivateRoute exact path='/user-profile' component={Profile} />
                <PrivateRoute
                    exact
                    path='/update-profile'
                    restricted={true}
                    component={UpdateProfile}
                />
                {/* Google Drive  */}
                <PrivateRoute exact path='/' component={Dashboard} />
            </Switch>
        </>
    );
}
