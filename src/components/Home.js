import React, { useState } from 'react';
import { SideBar } from './SideBar/SideBar';
import { ToggleContext } from '../utils/ToggleContext';
import { Navigation } from './Navigation/Navigation';
import { CategoryContext } from '../utils/CategoryContext';
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

	const [categoryState, setCategoryState] = useState({
		selection: '',
		search: '',
		onChange: (selection) => {
			setCategoryState({ ...categoryState, selection, search: '' });
		},
		onSearch: (search) => {
			setCategoryState({ ...categoryState, search, selection: '' })
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
	});

	const loadUser = async () => {
		const currentUser = await API.user.getCurrentUser();
		console.log('loaded user: ', currentUser)
		const { _id, username, email, bio, img, experience, reviews, favourites, comments } = currentUser;
		setUserState({
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

	useEffect(() => {
		loadUser();
	}, [])


	return (
		<ToggleContext.Provider value={toggleState}>
			<CategoryContext.Provider value={categoryState}>
				<UserContext.Provider value={userState}>
					<Navigation />
					<SideBar />
					<Main />
				</UserContext.Provider>
			</CategoryContext.Provider>
		</ToggleContext.Provider >
	)
}
