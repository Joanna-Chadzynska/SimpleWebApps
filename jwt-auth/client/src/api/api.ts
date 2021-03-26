import axios from 'axios';

export const axiosAuth = axios.create({
	baseURL: `http://localhost:4000/api`,
	headers: {
		Authorization: 'bearer ' + window.localStorage.getItem('token'),
		'Content-Type': 'application/json',
		Accepts: 'application/json',
	},
});

export const axiosNoAuth = axios.create({
	baseURL: `http://localhost:4000/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});
