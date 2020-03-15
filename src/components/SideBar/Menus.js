import React, { useContext, useState } from 'react';
import { Button } from './Button';
import { IconLink } from './IconLink';
import { ToggleContext } from '../../utils/ToggleContext';
import { faCog, faUser, faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';

export const Menus = () => {
	const { collapse } = useContext(ToggleContext);
	const [redirect, setRedirect] = useState();

	const handleLogout = async () => {
		const response = await API.logoutUser();
		setRedirect(response);
	}

	const links = collapse ? (
		<>
			<IconLink link={'/profile'} iconStyle={faUser} />
			<IconLink link={'/review/new'} iconStyle={faNewspaper} />
			<IconLink link={'/'} iconStyle={faHeart} />
			<IconLink onLogout={handleLogout} iconStyle={faCog} />
		</>
	) : (
			<>
				<Button value={'Profile'} link={'/profile'} />
				<Button value={'New Review'} link={'/review/new'} />
				<Button value={'my Favourites'} link={'/'} />
				<Button value={'Logout'} onLogout={handleLogout} />
			</>
		)

	return (
		<>
			<hr />
			{links}
			{redirect ? <Redirect to={redirect} /> : ''}
		</>
	)
}
