import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const navLinkActive = {
    color: '#fff',
    fontWeight: '500',
};

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
                            <NavLink
                                exact
                                to='/'
                                component={Nav.Link}
                                activeStyle={navLinkActive}
                            >
                                DashBoard
                            </NavLink>
                            <NavDropdown
                                title={currentUser.email}
                                id='basic-nav-dropdown'
                            >
                                <NavLink
                                    exact
                                    activeStyle={navLinkActive}
                                    component={NavDropdown.Item}
                                    to='user-profile'
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    exact
                                    activeStyle={navLinkActive}
                                    component={NavDropdown.Item}
                                    to='update-profile'
                                >
                                    Edit Profile
                                </NavLink>
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
                            <NavLink
                                exact
                                component={Nav.Link}
                                to='login'
                                activeStyle={navLinkActive}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                exact
                                component={Nav.Link}
                                to='signup'
                                activeStyle={navLinkActive}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
