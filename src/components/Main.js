import React, { useContext } from 'react'
import { Review } from './Review/Review';
import { CreateReview } from './CreateReview/CreateReview';
import { ProfileEdit } from './Profile/ProfileEdit';
import { Category } from './Category/Category';
import { Profile } from './Profile/Profile';
import { Route } from 'react-router-dom'
import { Feed } from './Feed/Feed';
import styled from 'styled-components';
import { ToggleContext } from '../utils/ToggleContext';
import Media from 'react-media';

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
		margin-top: 100px;
		transition-duration: 0.2s;
	}
	&.smallDeviceClosed {
		margin-top: 40px;
		transition-duration: 0.2s;
	}
`
export const Main = () => {
	const { collapse } = useContext(ToggleContext);
	return (
		<Media queries={{ small: { maxWidth: 599 } }}>
			{matches =>
				matches.small ? (
					<ContentRight className={collapse ? 'smallDeviceClosed' : 'smallDeviceOpen'}>
						<Route exact path='/profile/edit' component={ProfileEdit} />
						<Route exact path='/profile' component={Profile} />
						<Route exact path='/review/one/:id' component={Review} />
						<Route exact path='/review/new' component={CreateReview} />
						<Route exact path='/feed' component={Feed} />
						<Route exact path='/' component={Category} />
					</ContentRight>
				) : (
						<ContentRight className={collapse ? 'closedNav' : 'openNav'}>
							<Route exact path='/profile/edit' component={ProfileEdit} />
							<Route exact path='/profile' component={Profile} />
							<Route exact path='/review/one/:id' component={Review} />
							<Route exact path='/review/new' component={CreateReview} />
							<Route exact path='/feed' component={Feed} />
							<Route exact path='/' component={Category} />
						</ContentRight>
					)
			}
		</Media>

	)
}
