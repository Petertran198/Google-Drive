import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Header() {
    const { currentUser, logOut } = useAuth();
    const history = useHistory();
    const handleLogOut = async () => {
        try {
            await logOut();
            // Make sure to make this route private because if u don't react will think this route is public and when u log out there will be no currentUser therefore info on currentUser will be null and u will get an undefined error. If it is private when this page gets hit it will redirect to login and u won't get currentUser undefined error.
            history.push('/login');
        } catch {}
    };

    return (
        <Navbar bg='dark' expand='lg' variant='dark'>
            <Link to='/' component={Navbar.Brand}>
                G Drive
            </Link>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {currentUser ? (
                        <>
                            <Link to='/' component={Nav.Link}>
                                DashBoard
                            </Link>
                            <NavDropdown
                                title={currentUser.email}
                                id='basic-nav-dropdown'
                            >
                                <Link component={NavDropdown.Item} to='user-profile'>
                                    Profile
                                </Link>
                                <Link
                                    component={NavDropdown.Item}
                                    to='update-profile'
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    component={NavDropdown.Item}
                                    onClick={handleLogOut}
                                >
                                    Sign Out
                                </Link>
                            </NavDropdown>
                        </>
                    ) : (
                        <>
                            <Link component={Nav.Link} to='login'>
                                Login
                            </Link>
                            <Link component={Nav.Link} to='signup'>
                                Sign Up
                            </Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
