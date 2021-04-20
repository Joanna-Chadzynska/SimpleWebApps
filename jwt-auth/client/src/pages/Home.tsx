import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { axiosPosts } from '../api/api';

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
	const getPosts = async () => {
		try {
			const res = await axiosPosts.get('/posts', { withCredentials: true });
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPosts();
		return () => {};
	}, []);

	const refreshToken = async () => {
		if (!document.cookie.includes('_csrf')) return;
		try {
			const { data } = await axios.post(
				'/api/auth/refresh-token',
				{},
				{
					withCredentials: true,
				}
			);
		} catch (error) {}
	};

	return <Container>home page</Container>;
};

export default Home;
