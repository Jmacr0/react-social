import React, { useState, useEffect, useContext } from 'react';
import { Form, Container, Button, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import API from '../../../utils/API';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../utils/UserContext';

export const ReviewEdit = ({ match }) => {
	const [review, setReview] = useState({
		category: '',
		img: '',
		comments: [],
		favourites: [],
		_id: '',
		author: '',
		item: '',
		title: '',
		rating: '',
		pros: '',
		cons: '',
		description: '',
		createdAt: '',
		updatedAt: '',
		_v: ''
	});
	const { loadUser } = useContext(UserContext);
	const [categoryType, setCategoryType] = useState();
	const [alert, setAlert] = useState({
		message: '',
		type: ''
	});

	const history = useHistory();

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const updateReview = review;
			const response = await API.review.updateReview(updateReview);
			console.log(response);
			setAlert({
				message: 'Successfully updated !',
				type: 'success'
			})
			loadUser();
			setTimeout(() => {
				history.push('/profile');
			}, 500);
		} catch (err) {
			setAlert({
				message: 'Failed to update. Try again.',
				type: 'danger'
			})
			console.log(err);
		}
	}

	const loadReview = async () => {
		console.log('params id: ', match.params.id)
		const result = await API.review.getReview(match.params.id);
		console.log(result);
		setReview(result);
	}

	const loadCardColour = () => {
		switch (review.category) {
			case 'Technology':
				return setCategoryType('warning');
			case 'Fashion':
				return setCategoryType('success');
			case 'Miscellaneous':
				return setCategoryType('secondary');
			default: return setCategoryType('secondary');
		}
	}

	useEffect(() => {
		loadCardColour();
	}, [review.category]);

	useEffect(() => {
		loadReview();
	}, []);

	return (
		<>
			<Container style={{ backgroundColor: '#00346e' }} className='shadow p-3'>
				<h2>Edit Review</h2>
				<hr />
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Item *</Form.Label>
						<Form.Control type="text" name='item' value={review.item} placeholder="Airpods" onChange={e => setReview({ ...review, item: (e.target.value).substring(0, 30) })} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlInput2">
						<Form.Label>Title *</Form.Label>
						<Form.Control type="text" name='title' value={review.title} placeholder="Well, that was quite expensive!" onChange={e => setReview({ ...review, title: (e.target.value).substring(0, 30) })} />
					</Form.Group>
					<Row>
						<Col>
							<Form.Group controlId="exampleForm.ControlInput3">
								<Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Pros</Form.Label>
								<Form.Control type="text" name='title' value={review.pros} placeholder="Compatible with all my apple products ( the ecosystem ! )" onChange={e => setReview({ ...review, pros: (e.target.value).substring(0, 20) })} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="exampleForm.ControlInput4">
								<Form.Label style={{ color: 'red', fontWeight: 'bold' }}>Cons</Form.Label>
								<Form.Control type="text" name='title' value={review.cons} placeholder="Expensive" onChange={e => setReview({ ...review, cons: (e.target.value).substring(0, 20) })} />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label>Rating <span role='img' aria-label='star-emoji'>⭐</span> *</Form.Label>
								<div key='inline-radio' className="mb-3">
									{[1, 2, 3, 4, 5].map((rate, index) => {
										return <Form.Check inline key={index} name='ratingSelection' label={review.rate} type='radio' id={`inline-radio-${rate}`} onChange={() => setReview({ ...review, rating: rate })} checked={rate === review.rating} />
									})}
								</div>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>Category</Form.Label>
								<Dropdown>
									<Dropdown.Toggle variant={categoryType}>
										{review.category}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item
											onClick={() => {
												setReview({ ...review, category: 'Technology' });
												setCategoryType('warning');
											}
											}>Technology</Dropdown.Item>
										<Dropdown.Item onClick={() => {
											setReview({ ...review, category: 'Fashion' });
											setCategoryType('success');
										}
										}>Fashion</Dropdown.Item>
										<Dropdown.Item onClick={() => {
											setReview({ ...review, category: 'Miscellaneous' });
											setCategoryType('secondary');
										}
										}>Miscellaneous</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group>
						<Form.Label>Image (URL only)</Form.Label>
						<Form.Control type="text" name='image' value={review.img} onChange={e => setReview({ ...review, img: e.target.value })} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Your Review *</Form.Label>
						<Form.Control as="textarea" rows="4" placeholder="Great sound but doesn't offer the best value propostion. Other similar quality earphones for much cheaper." value={review.description} onChange={e => setReview({ ...review, description: e.target.value })} />
					</Form.Group>
					{alert.type ? (
						<Row>
							<Col>
								<Alert variant={alert.type}>
									{alert.message}
								</Alert>
							</Col>
						</Row>
					) : ''
					}
					<Button type='submit'>Save</Button>
				</Form>
			</Container>
		</>
	)
}
