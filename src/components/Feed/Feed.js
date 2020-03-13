import React, { useContext, useEffect, useState, } from 'react';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';
import API from '../../utils/API';
import { FeedReview } from './FeedReview';
import { Container } from 'react-bootstrap';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		padding: 0px 10px;
	}
	&.closedNav {
		margin-left: 50px;
		padding: 0px 10px;
	}
`

export const Feed = () => {
	const toggle = useContext(ToggleContext);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		API.getReviews()
			.then(reviews => {
				console.log(reviews);
				setReviews(reviews)
			})
	}, [])

	return (
		<>
			<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
				<Container>
					{reviews.map((review, index) =>
						<FeedReview review={review} key={index} />
					)}
				</Container>
			</ContentRight>
		</>
	)
}
