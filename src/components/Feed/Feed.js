import React, { useContext, useEffect, useState, } from 'react';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';
import API from '../../utils/API';
import { FeedReview } from './FeedReview';
import { Container } from 'react-bootstrap';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		padding: 0px;
		transition-duration: 0.2s;
	}
	&.closedNav {
		margin-left: 50px;
		padding: 0px;
		transition-duration: 0.2s;
	}
`

export const Feed = () => {
	const toggle = useContext(ToggleContext);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		API.review.getReviews()
			.then(reviews => {
				setReviews(reviews)
			})
	}, [])

	return (
		<>
			<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
				<Container fluid>
					{reviews.map((review, index) =>
						<FeedReview review={review} key={index} />
					)}
				</Container>
			</ContentRight>
		</>
	)
}
