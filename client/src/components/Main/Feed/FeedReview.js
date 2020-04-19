import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faImage } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../../utils/UserContext';
import TextTruncate from 'react-text-truncate';
import API from '../../../utils/API';
import { ModalDelete } from '../Modal/ModalDelete';
import '../../../index.css';
import { UserLink } from '../User/UserLink';
import { Favourite } from './Favourite/Favourite';

export const FeedReview = ({
	review: {
		_id,
		author,
		item,
		title,
		rating,
		category,
		pros,
		cons,
		description,
		img,
		favourites,
		createdAt
	}, noTruncate, loadReviews, loadReview, loadFavourites, loadProfileUser }) => {

	const { id, username, loadUser } = useContext(UserContext);
	const history = useHistory();

	const toFavourite = async () => {
		const newFavourite = {
			review: _id,
			author: id
		}
		const favourited = await API.favourite.saveFavourite(newFavourite);
		console.log('front end favourite: ', favourited);
		loadUser();
		if (loadReviews) {
			loadReviews();
		}
		if (loadReview) {
			loadReview();
		}
		if (loadFavourites) {
			loadFavourites();
		}
		if (loadProfileUser) {
			loadProfileUser();
		}
	}
	const toUnfavourite = async () => {
		const removeFavourite = {
			review: _id,
			author: id
		}
		const unfavourited = await API.favourite.removeFavourite(removeFavourite);
		console.log('front end favourite: ', unfavourited);
		loadUser();
		if (loadReviews) {
			loadReviews();
		}
		if (loadReview) {
			loadReview();
		}
		if (loadFavourites) {
			loadFavourites();
		}
		if (loadProfileUser) {
			loadProfileUser();
		}
	}

	const handleDelete = async () => {
		const deleteReview = {
			review: _id,
			author: id
		}
		const deleted = await API.review.deleteReview(deleteReview);
		console.log(deleted);
		handleClose();
		loadUser();
		if (loadReviews) {
			loadReviews();
		}
		if (loadReview) {
			history.push('/feed/All');
		}
		if (loadFavourites) {
			loadFavourites();
		}
		if (loadProfileUser) {
			loadProfileUser();
		}
	}

	// Set Card Colour
	const [cardColour, setCardColour] = useState('');
	const loadCardColour = () => {
		switch (category) {
			case 'Technology':
				return setCardColour('warning');
			case 'Fashion':
				return setCardColour('success');
			case 'Miscellaneous':
				return setCardColour('secondary');
			default: return setCardColour('secondary');
		}
	}

	// Modal management
	const location = useLocation();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		loadCardColour();
	}, [category]);

	return (
		<Row className='py-2'>
			<Col>
				<Card bg={cardColour} text='light'>
					<Tab.Container defaultActiveKey="main">
						<Card.Header style={{ fontWeight: 'bold' }}>
							<Nav variant="tabs">
								<Nav.Item>
									<Nav.Link eventKey='main'>
										<FontAwesomeIcon icon={faAddressBook} />
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='image'>
										<FontAwesomeIcon icon={faImage} />
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link style={{ color: 'white' }} disabled>{item}</Nav.Link>
								</Nav.Item>
								{location.pathname !== '/profile' &&
									<Nav.Item className='ml-auto'>
										<Favourite
											userId={id}
											favourites={favourites}
											onFavourite={toFavourite}
											onUnfavourite={toUnfavourite}
										/>
									</Nav.Item>}
								<Nav.Item className='ml-auto'>
									<Nav.Link disabled>
										{'⭐'.repeat(rating)}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item className='ml-auto'>
									<Link to={`/review/one/${_id}`} className='nav-link' style={{ color: 'white', textDecoration: 'none' }}>. . .</Link>
								</Nav.Item>
							</Nav>
						</Card.Header>
						<Tab.Content>
							<Tab.Pane eventKey='main'>
								<Card.Body style={{ height: (noTruncate ? 'auto' : '200px'), overflow: 'hidden' }}>
									<Card.Title>{title}</Card.Title>
									<hr className='mb-1' />
									{pros || cons ? (
										<>
											<Row>
												<Col>
													<span style={{ color: 'green', fontWeight: 'bold' }}>+</span><span> {pros}</span>
												</Col>
												<Col>
													<span style={{ color: 'red', fontWeight: 'bold' }}>-</span><span> {cons}</span>
												</Col>
											</Row>
											<hr className='mt-1' />
										</>
									) : ''}
									<Card.Text>
										{noTruncate ?
											description :
											<TextTruncate
												line={2}
												element="span"
												truncateText="..."
												text={description}
												textTruncateChild={
													<Link
														to={`/review/one/${_id}`}
														style={{
															color: '#c5c5c5',
															textDecoration: 'none'
														}}
													>
														see more
												</Link>}
											/>
										}
									</Card.Text>
								</Card.Body>
							</Tab.Pane>
						</Tab.Content>
						<Tab.Content>
							<Tab.Pane eventKey='image'>
								<Card.Body>
									<Card.Img className='review-image' src={img} />
								</Card.Body>
							</Tab.Pane>
						</Tab.Content>
						<Card.Footer>
							< UserLink user={author.username} createdAt={createdAt} />
							{author.username === username &&
								<Link
									to={`/review/one/edit/${_id}`}
									className='ml-auto'
									style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
								>EDIT
							</Link>
							}
							{author.username === username &&
								<span
									onClick={handleShow}
									className='ml-auto'
									style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }}
								>DELETE
							</span>
							}
						</Card.Footer>
					</Tab.Container>
				</Card>
			</Col>
			<ModalDelete
				title='Confirm Delete Review'
				show={show}
				onClose={handleClose}
				onDelete={handleDelete}
			/>
		</Row >
	)
}
