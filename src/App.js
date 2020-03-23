import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { NoMatch } from './components/NoMatch';
import API from './utils/API';
import AOS from 'aos';

function App() {
	AOS.init();
	const [authenticated, setAuthenticated] = useState({
		authenticated: false,
	});

	const authenticate = async () => {
		const isAuthenticated = await API.user.authenticateUser();
		setAuthenticated(isAuthenticated.user);
		if (isAuthenticated.user) {
			localStorage.setItem('user', isAuthenticated.id);
		}
		if (!isAuthenticated.user) {
			localStorage.setItem('user', '');
		}
	}

	useEffect(() => {
		authenticate();
	}, [])

	return (
		<>
			<Router>
				<>
					<Switch>
						<Route
							exact path='/sign-up'
							render={() => <SignUp onAuthenticate={setAuthenticated} />}
						/>
						{authenticated ? <Route path='/' component={Home} /> : <Redirect to='/sign-up' />}
						<Route path='*' component={NoMatch} />
					</Switch>
				</>
			</Router>
		</>
	);
}

export default App;
