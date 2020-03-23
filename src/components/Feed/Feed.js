import React, { useContext, useEffect, useState, } from 'react';
import API from '../../utils/API';
import { FeedReview } from './FeedReview';
import { Container } from 'react-bootstrap';
import { CategoryContext } from '../../utils/CategoryContext';

export const Feed = () => {
	const { selection, search } = useContext(CategoryContext);
	const [reviews, setReviews] = useState([]);

	const loadReviews = () => {
		if (selection === 'All' || selection === 'New') {
			API.review.getReviewsAll()
				.then(reviews => {
					setReviews(reviews)
					return;
				})
		} else {
			API.review.getReviewsOneType(selection)
				.then(reviews => {
					setReviews(reviews)
					return;
				})
		}
		if (search) {
			API.review.getReviewsSearch(search)
				.then(reviews => {
					setReviews(reviews)
					return;
				})
		}
	}

	useEffect(() => {
		loadReviews();
	}, [search])

	return (
		<>
			<Container fluid>
				{reviews.map((review, index) =>
					<FeedReview review={review} key={index} />
				)}
			</Container>
		</>
	)
}
