import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { NoMatch } from './components/NoMatch';

function App() {
	return (
		<React.Fragment>
			<Router>
				<>
					<Switch>
						<Route path='/' component={Home} />
						<Route path='*' component={NoMatch} />
					</Switch>
				</>
			</Router>
		</React.Fragment>
	);
}

export default App;
