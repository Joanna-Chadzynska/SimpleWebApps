import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Navbar } from './components';
import { Home, Landing, SignIn, SignUp } from './pages';
import { IsUserRedirect, PrivateRoute } from './routing/PrivateRoute';

function App() {
	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get('/api/auth/csrf-token');
			axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
		};
		getCsrfToken();
		// const refreshToken = async () => {
		// 	const { data } = await axios.post('/api/auth/refresh-token');
		// 	// setAccessToken(data.accessToken);
		// };
		// refreshToken();

		return () => {};
	}, []);

	return (
		<div style={{ maxWidth: 960, margin: '0 auto' }}>
			<Container fluid>
				<Router>
					<Navbar />
					<Switch>
						<IsUserRedirect exact path='/' loggedInPath='/home'>
							<Landing />
						</IsUserRedirect>
						<PrivateRoute path='/home'>
							<Home />
						</PrivateRoute>
						<IsUserRedirect exact path='/signup' loggedInPath='/home'>
							<SignUp />
						</IsUserRedirect>
						<IsUserRedirect exact path='/signin' loggedInPath='/home'>
							<SignIn />
						</IsUserRedirect>
					</Switch>
				</Router>
			</Container>
		</div>
	);
}

export default App;
