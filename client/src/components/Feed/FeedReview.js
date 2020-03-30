import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Nav, Tab, Modal, Button } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faAddressBook, faImage, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';
import TextTruncate from 'react-text-truncate';
import API from '../../utils/API';
import '../../index.css';

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
	}, noTruncate, loadReviews, loadReview }) => {

	const { id, username, loadUser } = useContext(UserContext);
	const history = useHistory();

	const isFavourite = (favourite, index) => {
		console.log(id, favourite.author)
		if (id === favourite.author) {
			return <FontAwesomeIcon
				key={index}
				icon={faHeartSolid}
				style={{ cursor: 'pointer', color: '#ff4f4f' }}
				onClick={() => toUnfavourite()}
			/>
		}
		return <FontAwesomeIcon
			key={index}
			icon={faHeartRegular}
			style={{ cursor: 'pointer' }}
			onClick={() => toFavourite()} />
	}
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
	}

	const handleDelete = async () => {
		const deleteReview = {
			review: _id,
			author: id
		}
		const deleted = await API.review.deleteReview(deleteReview);
		handleClose();
		loadUser();
		if (loadReviews) {
			loadReviews();
		}
		if (loadReview) {
			history.push('/feed/All');
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
										{
											favourites.length
												? favourites.map(
													(favourite, index) => isFavourite(favourite, index))
												: <FontAwesomeIcon
													icon={faHeartRegular}
													style={{ cursor: 'pointer' }}
													onClick={() => toFavourite()} />
										}
									</Nav.Item>}
								<Nav.Item className='ml-auto'>
									{author.username === username && <Link to={`/review/one/edit/${_id}`} style={{ color: 'white', textDecoration: 'none' }}>EDIT</Link>}
								</Nav.Item>
								<Nav.Item className='ml-auto'>
									{author.username === username && <Nav.Link onClick={handleShow} style={{ color: 'red', textDecoration: 'none' }}>DELETE</Nav.Link>}
								</Nav.Item>
								<Nav.Item className='ml-auto'>
									{'⭐'.repeat(rating)}
								</Nav.Item>
								<Nav.Item className='ml-auto'>
									<Link to={`/review/one/${_id}`} style={{ color: 'white', textDecoration: 'none' }}>. . .</Link>
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
												element="p"
												truncateText="..."
												text={description}
												textTruncateChild={<Link to={`/review/one/${_id}`} style={{ color: '#0099ff', textDecoration: 'none' }}>see more</Link>} />
										}
									</Card.Text>
								</Card.Body>
							</Tab.Pane>
						</Tab.Content>
						<Tab.Content>
							<Tab.Pane eventKey='image'>
								<Card.Body>
									<Card.Img src={img} />
								</Card.Body>
							</Tab.Pane>
						</Tab.Content>
						<Card.Footer>
							written by - {author.username} @ {createdAt}
						</Card.Footer>
					</Tab.Container>
				</Card>
			</Col>
			<>
				<Modal
					show={show}
					onHide={handleClose}
					animation={false}
					backdrop='static'
					dialogClassName="my-modal-width"
					centered
				>
					<Modal.Header style={{ backgroundColor: '#002857' }} closeButton>
						<Modal.Title>Confirm Review Delete</Modal.Title>
					</Modal.Header>
					<Modal.Footer style={{ backgroundColor: '#00346e' }}>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
          </Button>
						<Button variant="danger" onClick={handleDelete}>
							DELETE
          </Button>
					</Modal.Footer>
				</Modal>
			</>
		</Row >
	)
}
