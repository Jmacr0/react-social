import React, { useContext } from 'react';
import { Button } from './Button';
import { IconLink } from './IconLink';
import { ToggleContext } from '../../utils/ToggleContext';
import { faCog, faUser, faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons';

export const Menus = () => {
	const { collapse } = useContext(ToggleContext);

	const links = collapse ?
		<>
			<IconLink link={'/profile'} iconStyle={faUser} />
			<IconLink link={'/new-review'} iconStyle={faNewspaper} />
			<IconLink link={'/'} iconStyle={faHeart} />
			<IconLink link={'/'} iconStyle={faCog} />
		</>
		:
		<>
			<Button value={'Profile'} link={'/profile'} />
			<Button value={'New Review'} link={'/new-review'} />
			<Button value={'my Favourites'} link={'/'} />
			<Button value={'Logout'} link={'/'} />
		</>

	return (
		<React.Fragment>
			<hr />
			{links}
		</React.Fragment>
	)
}
