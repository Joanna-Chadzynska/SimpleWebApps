import axios from 'axios';
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

export interface NavbarContainerProps {}

const NavbarContainer: React.SFC<NavbarContainerProps> = () => {
	const history = useHistory();
	const currentUser = localStorage.getItem('currentUser');

	const logout = async () => {
		const resp = await axios.get('/api/auth/logout');
		setAccessToken('');
		localStorage.removeItem('currentUser');
		window.location.reload();
		history.push('/');
		return resp;
	};
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Navbar.Brand href='/'>Auth.</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav>
					{currentUser ? (
						<Button onClick={logout}>Sign out</Button>
					) : (
						<>
							<NavLink to='/signin'>Sign in</NavLink>
							&nbsp; &nbsp; &nbsp;
							<NavLink to='/signup'>Sign up</NavLink>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarContainer;
