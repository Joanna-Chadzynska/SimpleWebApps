import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export interface NavbarContainerProps {}

const NavbarContainer: React.SFC<NavbarContainerProps> = () => {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Navbar.Brand href='/'>Auth.</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				{/* <Nav className='mr-auto'>
					<Nav.Link href='#features'>Features</Nav.Link>
					<Nav.Link href='#pricing'>Pricing</Nav.Link>
					<NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav> */}
				<Nav>
					<NavLink to='/signin'>Sign in</NavLink>

					<NavLink to='/signup'>Sign up</NavLink>

					{/* <Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>
							Signed in as: <a href='#login'>Mark Otto</a>
						</Navbar.Text>
					</Navbar.Collapse> */}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarContainer;
