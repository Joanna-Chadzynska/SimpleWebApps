import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

export interface LandingProps {}

const Landing: React.SFC<LandingProps> = () => {
	const getPosts = async () => {
		try {
			const res = await axios.get('/api/posts');
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPosts();
		return () => {};
	}, []);
	return <Container>Landing page</Container>;
};

export default Landing;
