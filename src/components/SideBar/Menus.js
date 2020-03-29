import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MenuLink } from './MenuLink';
import { faCog, faUser, faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';

export const Menus = () => {
	const [redirect, setRedirect] = useState();

	const handleLogout = async () => {
		const response = await API.user.logoutUser();
		localStorage.setItem('user', '');
		setRedirect(response);
	}

	return (
		<>
			<MenuLink iconStyle={faUser} value={'PROFILE'} link={'/profile'} />
			<MenuLink iconStyle={faNewspaper} value={'NEW REVIEW'} link={'/review/new'} />
			<MenuLink iconStyle={faHeart} value={'MY FAVOURITES'} link={'/favourites'} />
			<MenuLink iconStyle={faCog} value={'LOGOUT'} onLogout={handleLogout} />
			{redirect ? <Redirect to={redirect} /> : ''}
		</>
	)
}
