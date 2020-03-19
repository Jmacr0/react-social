import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import { Feed } from './Feed/Feed';
import { SideBar } from './SideBar/SideBar';
import { ToggleContext } from '../utils/ToggleContext';
import { Profile } from './Profile/Profile';
import { Navigation } from './Navigation/Navigation';
import { Review } from './Review/Review';
import { CreateReview } from './CreateReview/CreateReview';
import { ProfileEdit } from './Profile/ProfileEdit';
import { Category } from './Category/Category';

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
			<Route exact path='/profile/edit' component={ProfileEdit} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/review/one/:id' component={Review} />
			<Route exact path='/review/new' component={CreateReview} />
			<Route exact path='/feed' component={Feed} />
			<Route exact path='/' component={Category} />
		</ToggleContext.Provider >
	)
}
