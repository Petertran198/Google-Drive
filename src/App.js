import React from 'react';
import { Container } from 'react-bootstrap';
// remember npm install react-router-dom
import { Switch } from 'react-router-dom';
import PublicRoute from './route/PublicRoute';
import PrivateRoute from './route/PrivateRoute';
import SignUp from './components/auth/SignUp';
import Profile from './components/auth/Profile';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import UpdateProfile from './components/auth/UpdateProfile';

export default function App() {
    return (
        <Container
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Switch>
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
                    <PrivateRoute exact path='/user-profile' component={Profile} />
                    <PublicRoute
                        exact
                        path='/forgot-password'
                        component={ForgotPassword}
                    />
                    <PrivateRoute
                        exact
                        path='/update-profile'
                        restricted={true}
                        component={UpdateProfile}
                    />
                </Switch>
            </div>
        </Container>
    );
}
