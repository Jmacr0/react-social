import React, { useState } from 'react';
import { SideBar } from './SideBar/SideBar';
import { ToggleContext } from '../utils/ToggleContext';
import { Navigation } from './Navigation/Navigation';
import { SearchContext } from '../utils/SearchContext';
import { UserContext } from '../utils/UserContext';
import { useEffect } from 'react';
import API from '../utils/API';
import { Main } from './Main';

export const Home = () => {
	const [toggleState, setToggleState] = useState({
		collapse: false,
		onClick: (collapse) => {
			setToggleState({ ...toggleState, collapse });
		}
	});

	const [searchState, setSearchState] = useState({
		search: '',
		onSearch: (search) => {
			setSearchState({ ...searchState, search })
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
			console.log(username)
		}
	});

	useEffect(() => {
		userState.loadUser();
	}, [])


	return (
		<ToggleContext.Provider value={toggleState}>
			<SearchContext.Provider value={searchState}>
				<UserContext.Provider value={userState}>
					<Navigation />
					<SideBar />
					<Main />
				</UserContext.Provider>
			</SearchContext.Provider>
		</ToggleContext.Provider >
	)
}
