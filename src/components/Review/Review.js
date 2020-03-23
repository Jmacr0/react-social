import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Tab, Nav, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faImage } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../Comment/Comment';

export const Review = ({ match }) => {
	const [cardColour, setCardColour] = useState('');

	const [review, setReview] = useState({
		img: '',
		_id: '',
		item: '',
		title: '',
		author: '',
		rating: '',
		category: '',
		pros: '',
		cons: '',
		description: '',
		comments: [],
		createdAt: '',
		_v: ''
	})

	const [comment, setComment] = useState('');
	const [redirect, setRedirect] = useState('');

	const loadReview = async () => {
		const result = await API.review.getReview(match.params.id);
		console.log(result)
		setReview(result);
	}

	const loadCardColour = () => {
		switch (review.category) {
			case 'Technology':
				return setCardColour('warning');
			case 'Fashion':
				return setCardColour('success');
			case 'Miscellaneous':
				return setCardColour('secondary');
			default: return setCardColour('secondary');
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newComment = {
			review: review._id,
			body: comment,
		}
		console.log(newComment)
		const response = await API.comment.saveComment(newComment);
		console.log('front-end', response)
		setRedirect(`/review/one/${review._id}`);
	}

	useEffect(() => {
		loadCardColour();
	}, [review.category]);

	useEffect(() => {
		loadReview();
	}, []);

	return (
		<>
			<Container>
				<Row className='mt-2'>
					<Col>
						<Card border={cardColour} text={cardColour}>
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
											<Nav.Link disabled>{review.item}</Nav.Link>
										</Nav.Item>
										<Nav.Item className='ml-auto'>
											{'⭐'.repeat(review.rating)}
										</Nav.Item>
									</Nav>
								</Card.Header>
								<Tab.Content>
									<Tab.Pane eventKey='main'>
										<Card.Body style={{ minHeight: '200px', overflow: 'hidden' }}>
											<Card.Title>{review.title}</Card.Title>
											<hr />
											{review.pros || review.cons ? (
												<>
													<Row>
														<Col>
															<span style={{ color: 'green', fontWeight: 'bold' }}>+</span><span> {review.pros}</span>
														</Col>
														<Col>
															<span style={{ color: 'red', fontWeight: 'bold' }}>-</span><span> {review.cons}</span>
														</Col>
													</Row>
													<hr />
												</>
											) : ''}
											<Card.Text>
												{review.description}
											</Card.Text>
										</Card.Body>
									</Tab.Pane>
								</Tab.Content>
								<Tab.Content>
									<Tab.Pane eventKey='image'>
										<Card.Body>
											<Card.Img src={review.img} />
										</Card.Body>
									</Tab.Pane>
								</Tab.Content>
								<Card.Footer>
									written by - {review.author} @ {review.createdAt}
								</Card.Footer>
							</Tab.Container>
						</Card>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row className='mt-2'>
					<Col>
						<Form onSubmit={handleSubmit}>
							New Comment:
							<Row>
								<Col xs={10}>
									<Form.Group>
										<Form.Control as='textarea' rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
									</Form.Group>
								</Col>
								<Col>
									<Button variant='primary' type='submit'>Submit</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col>
						{review.comments.length ? review.comments.map((comment, index) => {
							return <Comment key={index} value={comment} />
						}) : ''}
					</Col>
				</Row>
				{redirect ? <Redirect to={redirect} /> : ''}
			</Container>
		</>
	)
}
