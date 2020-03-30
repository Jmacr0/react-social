import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import API from '../../utils/API';
import { FeedReview } from '../Feed/FeedReview';

export const Favourites = () => {
	const [favouriteReviews, setFavouriteReviews] = useState([]);

	// console.log()
	// const [descReviews, setDescReviews] = useState([]);
	// const reverseOrder = () => {
	// 	const reverseReviews = reviews.reverse();
	// 	setDescReviews(reverseReviews);
	// }

	const loadFavourites = () => {
		API.favourite.getFavouriteReviews()
			.then(result => {
				console.log(result);
				setFavouriteReviews(result);
			})
	}

	useEffect(() => {
		loadFavourites();
	}, [])

	return (
		<>
			<Container style={{ backgroundColor: '#00346e' }} fluid>
				<div className='text-center'>
					<h2>My Favourites</h2>
				</div>
				{favouriteReviews.map((favourite, index) =>
					<FeedReview review={favourite.review} loadFavourites={loadFavourites} key={index} />
				)}
			</Container>
		</>
	)
}

