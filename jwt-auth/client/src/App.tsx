import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components';
import { Landing, SignIn, SignUp } from './pages';

function App() {
	return (
		<div style={{ maxWidth: 960, margin: '0 auto' }}>
			<Container fluid>
				<Router>
					<Navbar />
					<Switch>
						<Route exact path='/'>
							<Landing />
						</Route>
						<Route exact path='/signup'>
							<SignUp />
						</Route>
						<Route exact path='/signin'>
							<SignIn />
						</Route>
					</Switch>
				</Router>
			</Container>
		</div>
	);
}

export default App;
