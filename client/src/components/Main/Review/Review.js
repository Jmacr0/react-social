import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import API from '../../../utils/API';
import { Comment } from '../Review/Comment/Comment';
import { FeedReview } from '../Feed/FeedReview';

export const Review = ({ match }) => {
	const [review, setReview] = useState({
		img: '',
		_id: '',
		item: '',
		title: '',
		author: {},
		rating: '',
		category: '',
		pros: '',
		cons: '',
		description: '',
		comments: [],
		favourites: [],
		createdAt: '',
		_v: ''
	});

	const [comment, setComment] = useState('');

	const loadReview = async () => {
		console.log('params id: ', match.params.id)
		const result = await API.review.getReview(match.params.id);
		console.log(result)
		setReview(result);
	}

	const handleDelete = () => {
		loadReview();
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newComment = {
			review: review._id,
			body: comment,
		}
		console.log(newComment)
		const response = await API.comment.saveComment(newComment);
		console.log('front-end', response);
		loadReview();
	}

	useEffect(() => {
		loadReview();
	}, []);

	return (
		<>
			<Container fluid style={{ backgroundColor: '#00346e' }}>
				<FeedReview
					review={review}
					loadReview={loadReview}
					noTruncate={true}
				/>
			</Container>
			<Container fluid style={{ backgroundColor: '#00346e' }}>
				<Row className='pt-2'>
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
							return <Comment
								key={index}
								value={comment}
								onDelete={handleDelete} />
						}) : ''}
					</Col>
				</Row>
			</Container>
		</>
	)
}
