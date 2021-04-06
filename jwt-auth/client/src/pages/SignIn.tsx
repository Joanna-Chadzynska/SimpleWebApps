import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { setAccessToken } from '../accessToken';

export interface SignInProps {}
export type User = {
	email: string;
	password: string;
};

const SignIn: React.SFC<SignInProps> = () => {
	const history = useHistory();
	const [user, setLoggedUser] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		password: '',
		email: '',
	});

	const login = async (user: User) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const resp = (await axios.post('/api/auth/login', user, config)).data;
			setAccessToken(resp.accessToken);
			localStorage.setItem('currentUser', JSON.stringify(resp.user));
			window.location.reload();
			history.push('/home');
			return resp;
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({ email: '', password: '' });
		login(user);
		setLoggedUser({
			email: '',
			password: '',
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoggedUser({
			...user,
			[name]: value,
		});
	};

	return (
		<Container>
			<h2>Sign In</h2>
			<Form onSubmit={handleSubmit} noValidate>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						name='email'
						value={user.email}
						onChange={handleChange}
						placeholder='Enter email'
					/>
					{errors?.email && <Form.Text muted>{errors.email}</Form.Text>}
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						value={user.password}
						onChange={handleChange}
						placeholder='Password'
					/>
					{errors?.password && <Form.Text muted>{errors.password}</Form.Text>}
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default SignIn;
