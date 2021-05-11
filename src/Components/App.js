import React from 'react';
import { Container } from 'react-bootstrap';
// remember npm install react-router-dom
import { Route, Switch } from 'react-router-dom';
import PublicRoute from '../route/PublicRoute';
import SignUp from '../auth/SignUp';
import Dashboard from './Dashboard';
import Login from '../auth/Login';
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
                    <PublicRoute exact path='/' component={Dashboard} />
                </Switch>
            </div>
        </Container>
    );
}
