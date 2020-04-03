import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Alert } from 'react-bootstrap';
import API from '../../utils/API';

export const CommentEdit = ({ match }) => {
	const [comment, setComment] = useState({
		_id: '',
		review: '',
		author: '',
		body: '',
		createdAt: '',
		updatedAt: '',
		_v: ''
	});

	const [alert, setAlert] = useState({
		message: '',
		type: ''
	});

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const updateComment = comment;
			const response = await API.comment.updateComment(updateComment);
			console.log(response);
			setAlert({
				message: 'Successfully updated !',
				type: 'success'
			})
		} catch (err) {
			setAlert({
				message: 'Failed to update. Try again.',
				type: 'danger'
			})
			console.log(err);
		}
	}

	const loadComment = async () => {
		console.log('params id: ', match.params.id)
		const result = await API.comment.getComment(match.params.id);
		console.log(result);
		setComment(result);
	}

	useEffect(loadComment, []);

	return (
		<>
			<Container className='shadow p-3' style={{ backgroundColor: '#00346e' }}>
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
				<h2>Edit Comment</h2>
				<hr />
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Your Comment *</Form.Label>
						<Form.Control as="textarea" rows="4" value={comment.body} onChange={e => setComment({ ...comment, body: e.target.value })} />
					</Form.Group>
					<Button type='submit'>Save</Button>
				</Form>
			</Container>
		</>
	)
}
