import React, { useContext, useEffect, useState, } from 'react';
import API from '../../utils/API';
import { FeedReview } from './FeedReview';
import { Container } from 'react-bootstrap';
import { SearchContext } from '../../utils/SearchContext';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

export const Feed = () => {
	const { search } = useContext(SearchContext);
	const [reviews, setReviews] = useState([]);

	const { category } = useParams();
	const { id } = useContext(UserContext);


	const loadReviews = () => {
		if (category === 'All') {
			API.review.getReviewsAll()
				.then(reviews => {
					console.log('all: ', reviews)
					setReviews(reviews);
					return;
				})
		} else {
			API.review.getReviewsOneType(category)
				.then(reviews => {
					console.log('certain type: ', reviews)
					setReviews(reviews);
					return;
				})
		}
		if (search) {
			API.review.getReviewsSearch(search)
				.then(reviews => {
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
		<>
			<Container style={{ backgroundColor: '#00346e' }} fluid>
				{reviews.map((review, index) =>
					<FeedReview
						review={review}
						loadReviews={loadReviews}
						// handleFavouriteChange={handleFeedReviewFavouriteChange}
						key={index} />
				)}
			</Container>
		</>
	)
}
