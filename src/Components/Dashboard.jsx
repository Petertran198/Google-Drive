import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const { currentUser, logOut } = useAuth();
    const history = useHistory();
    const handleLogOut = async () => {
        await logOut();
    };
    return (
        <div>
            Dash Board
            {currentUser ? (
                <button onClick={logOut}>LogOut</button>
            ) : (
                <Link to='/login'>
                    <button>Login</button>
                </Link>
            )}
        </div>
    );
}
