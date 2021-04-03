import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

export interface SignUpProps {}

export type User = {
	name: string;
	email: string;
	password: string;
};

const SignUp: React.SFC<SignUpProps> = () => {
	const history = useHistory();
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		name: '',
	});

	const register = async (user: User) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const resp = (await axios.post('/api/auth/signup', user, config)).data;
			localStorage.setItem('currentUser', JSON.stringify(resp));
			history.push('/home');
			return resp;
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({ email: '', password: '', name: '' });
		register(newUser);
		setNewUser({
			name: '',
			email: '',
			password: '',
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewUser({
			...newUser,
			[name]: value,
		});
	};

	return (
		<Container>
			<h2>Sign Up</h2>
			<Form onSubmit={handleSubmit} noValidate>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						name='name'
						value={newUser.name}
						onChange={handleChange}
						placeholder='Enter username'
					/>
					{errors?.name && <Form.Text muted>{errors.name}</Form.Text>}
				</Form.Group>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						name='email'
						value={newUser.email}
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
						value={newUser.password}
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

export default SignUp;
