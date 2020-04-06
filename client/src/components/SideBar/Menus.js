import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuLink } from './MenuLink';
import { faSignOutAlt, faUser, faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import { ModalLogout } from '../Main/Modal/ModalLogout';

export const Menus = () => {

	const handleLogout = async () => {
		const response = await API.user.logoutUser();
		localStorage.setItem('user', '');
		history.replace('/sign-up');
	}

	// Modal management
	const history = useHistory();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<MenuLink iconStyle={faUser} value={'PROFILE'} link={'/profile'} />
			<MenuLink iconStyle={faNewspaper} value={'NEW REVIEW'} link={'/review/new'} />
			<MenuLink iconStyle={faHeart} value={'MY FAVOURITES'} link={'/favourites'} />
			<MenuLink iconStyle={faSignOutAlt} value={'LOGOUT'} onShow={handleShow} />
			<ModalLogout
				title='Confirm Logout'
				show={show}
				onClose={handleClose}
				onLogout={handleLogout}
			/>
		</>
	)
}
