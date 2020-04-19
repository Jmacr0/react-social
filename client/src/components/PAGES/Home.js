import React, { useState, useEffect } from 'react';
import { SideBar } from '../SideBar/SideBar';
import { ToggleContext } from '../../utils/ToggleContext';
import { Navigation } from '../Navigation/Navigation';
import { UserContext } from '../../utils/UserContext';
import API from '../../utils/API';
import { Main } from '../Main/Main';

export const Home = () => {
	const [toggleState, setToggleState] = useState({
		collapse: true,
		onClick: (collapse) => {
			setToggleState({ ...toggleState, collapse });
		}
	});

	const [userState, setUserState] = useState({
		id: '',
		username: '',
		email: '',
		bio: '',
		img: '',
		experience: '',
		reviews: [],
		favourites: [],
		comments: [],
		loadUser: async () => {
			const currentUser = await API.user.getCurrentUser();
			console.log('loaded user: ', currentUser)
			const { _id, username, email, bio, img, experience, reviews, favourites, comments } = currentUser;
			setUserState({
				...userState,
				id: _id,
				username,
				email,
				bio,
				img,
				experience,
				reviews,
				favourites,
				comments,
			});
		}
	});

	useEffect(() => { userState.loadUser() }, []);

	return (
		<ToggleContext.Provider value={toggleState}>
			<UserContext.Provider value={userState}>
				<Navigation />
				<SideBar />
				<Main />
			</UserContext.Provider>
		</ToggleContext.Provider >
	)
}
