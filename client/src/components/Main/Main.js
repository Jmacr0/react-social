import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Media from 'react-media';
import { ToggleContext } from '../../utils/ToggleContext';
import { Feed } from './Feed/Feed';
import { Review } from './Review/Review';
import { ReviewCreate } from './Review/ReviewCreate';
import { ReviewEdit } from './Review/ReviewEdit';
import { Profile } from './Profile/Profile';
import { ProfileEdit } from './Profile/ProfileEdit';
import { ProfileUser } from './Profile/ProfileUser';
import { Category } from './Category/Category';


import { CommentEdit } from './Review/Comment/CommentEdit';
import { Favourites } from './Favourites/Favourites';
import styled from 'styled-components';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		transition-duration: 0.2s;
	}
	&.closedNav {
		margin-left: 50px;
		transition-duration: 0.2s;
	}
	&.smallDeviceOpen {
		margin-top: 80px;
		transition-duration: 0.2s;
	}
	&.smallDeviceClosed {
		margin-top: 40px;
		transition-duration: 0.2s;
	}
`
export const Main = () => {
	const { collapse } = useContext(ToggleContext);
	const routes = (
		<>
			<Route exact path='/profile/edit' component={ProfileEdit} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/profile/:user' component={ProfileUser} />
			<Route exact path='/review/one/:id' component={Review} />
			<Route exact path='/review/new' component={ReviewCreate} />
			<Route exact path='/review/one/edit/:id' component={ReviewEdit} />
			<Route exact path='/comment/one/edit/:id' component={CommentEdit} />
			<Route exact path='/favourites' component={Favourites} />
			<Route exact path='/feed/:category' component={Feed} />
			<Route exact path='/feed/search/:search' component={Feed} />
			<Route exact path='/' component={Category} />
		</>
	)

	return (
		<Media queries={{ small: { maxWidth: 599 } }}>
			{matches =>
				matches.small ? (
					<ContentRight className={collapse ? 'smallDeviceClosed' : 'smallDeviceOpen'}>
						{routes}
					</ContentRight>
				) : (
						<ContentRight className={collapse ? 'closedNav' : 'openNav'}>
							{routes}
						</ContentRight>
					)
			}
		</Media>

	)
}
