import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAccessToken } from './../accessToken';

export interface PrivateRouteProps {
	path: string;
}

export interface RedirectProps {
	loggedInPath: any;
	path: any;
	exact?: boolean;
}

const IsUserRedirect: React.FC<RedirectProps> = ({
	loggedInPath,
	children,
	...rest
}) => {
	const currentUser = localStorage.getItem('currentUser');
	return (
		<Route
			{...rest}
			render={
				() => {
					return !currentUser ? (
						children
					) : (
						<Redirect
							to={{
								pathname: loggedInPath,
							}}
						/>
					);
				}

				// return null;
			}
		/>
	);
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	path,
	...rest
}: any) => {
	const currentUser = localStorage.getItem('currentUser');
	const accessToken = getAccessToken();
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return currentUser ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
};

export { PrivateRoute, IsUserRedirect };
