import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import { Feed } from './Feed/Feed';
import { SideBar } from './SideBar/SideBar';
import { ToggleContext } from '../utils/ToggleContext';
import { Profile } from './Profile/Profile';
import { Navigation } from './Navigation/Navigation';
import { Review } from './Review/Review';
import { CreateReview } from './CreateReview/CreateReview';

export const Home = () => {
	const [toggleState, setToggleState] = useState({
		collapse: false,
		onClick: (collapse) => {
			setToggleState({ ...toggleState, collapse });
		}
	});

	return (
		<ToggleContext.Provider value={toggleState}>
			<Navigation />
			<SideBar />
			<Route exact path='/' component={Feed} />
			<Route path='/profile' component={Profile} />
			<Route path='/review' component={Review} />
			<Route path='/new-review' component={CreateReview} />
		</ToggleContext.Provider >
	)
}
