import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../../utils/API';
import { FeedReview } from './FeedReview';

export const Feed = () => {
	const [reviews, setReviews] = useState([]);
	const { category, search } = useParams();

	const loadReviews = () => {
		if (category === 'All') {
			API.review.getReviewsAll()
				.then(reviews => {
					console.log('all: ', reviews)
					setReviews(reviews);
					return;
				})
		} else if (category) {
			API.review.getReviewsOneType(category)
				.then(reviews => {
					console.log('certain type: ', reviews)
					setReviews(reviews);
					return;
				})
		}
		if (search) {
			console.log('feed search: ', search)
			API.review.getReviewsSearch(search)
				.then(reviews => {
					console.log('search...', reviews)
					setReviews(reviews);
					return;
				})
		}
	}

	// const handleFeedReviewFavouriteChange = (review_id, isFavourite) => {
	// 	const newReviews = [];
	// 	for (const review of reviews) {
	// 		const newReview = { ...review };
	// 		if (newReview._id === review_id) {
	// 			if (isFavourite) {
	// 				newReview.favourites.push({
	// 					user: id,
	// 					review: review_id,
	// 				})
	// 			} else {
	// 				newReview.favourites = newReview.favourites.filter((favourite) => favourite.user_id !== id);
	// 			}
	// 		}
	// 		newReviews.push(newReview);
	// 	}
	// 	this.setReviews(newReviews);
	// };

	useEffect(() => {
		loadReviews();
	}, [search, category]);

	return (
		<Container style={{ backgroundColor: '#00346e' }} fluid>
			{reviews.map((review, index) =>
				<FeedReview
					review={review}
					loadReviews={loadReviews}
					// handleFavouriteChange={handleFeedReviewFavouriteChange}
					key={index} />
			)}
		</Container>
	)
}
