import React, { useContext, useState } from 'react';
import { Form, Container, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';
import API from '../../utils/API';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		padding: 0px 10px;
	}
	&.closedNav {
		margin-left: 50px;
		padding: 0px 10px;
	}
`
export const CreateReview = () => {
	const [item, setItem] = useState('');
	const [title, setTitle] = useState('');
	const [rating, setRating] = useState('');
	const [categoryType, setCategoryType] = useState({
		category: 'Miscellaneous',
		colour: 'secondary'
	});
	const [pros, setPros] = useState('');
	const [cons, setCons] = useState('');
	const [description, setDescription] = useState('');

	const toggle = useContext(ToggleContext);

	const [redirect, setRedirect] = useState();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { category } = categoryType;
		const newReview = {
			item,
			title,
			rating,
			category,
			pros,
			cons,
			description
		}
		const response = await API.review.saveReview(newReview);
		setRedirect(response);
	}

	return (
		<>
			<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
				<Container className='shadow p-3'>
					<h2>New Review</h2>
					<hr />
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Item *</Form.Label>
							<Form.Control type="text" name='item' value={item} placeholder="Airpods" onChange={e => setItem((e.target.value).substring(0, 30))} />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlInput2">
							<Form.Label>Title *</Form.Label>
							<Form.Control type="text" name='title' value={title} placeholder="Well, that was quite expensive!" onChange={e => setTitle((e.target.value).substring(0, 30))} />
						</Form.Group>
						<Row>
							<Col>
								<Form.Group controlId="exampleForm.ControlInput3">
									<Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Pros</Form.Label>
									<Form.Control type="text" name='title' value={pros} placeholder="Compatible with all my apple products ( the ecosystem ! )" onChange={e => setPros((e.target.value).substring(0, 20))} />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="exampleForm.ControlInput4">
									<Form.Label style={{ color: 'red', fontWeight: 'bold' }}>Cons</Form.Label>
									<Form.Control type="text" name='title' value={cons} placeholder="Expensive" onChange={e => setCons((e.target.value).substring(0, 20))} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Rating <span role='img' aria-label='star-emoji'>⭐</span> *</Form.Label>
									<div key='inline-radio' className="mb-3">
										{[1, 2, 3, 4, 5].map((rate, index) => {
											return <Form.Check inline key={index} name='ratingSelection' label={rate} type='radio' id={`inline-radio-${rate}`} onChange={() => setRating(rate)} checked={rating === rate} />
										})}
									</div>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Category</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant={categoryType.colour}>
											{categoryType.category}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item
												onClick={() => setCategoryType({
													category: 'Technology',
													colour: 'warning'
												})
												}>Technology</Dropdown.Item>
											<Dropdown.Item onClick={() => setCategoryType({
												category: 'Fashion',
												colour: 'success'
											})
											}>Fashion</Dropdown.Item>
											<Dropdown.Item onClick={() => setCategoryType({
												category: 'Miscellaneous',
												colour: 'secondary'
											})
											}>Miscellaneous</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Your Review *</Form.Label>
							<Form.Control as="textarea" rows="4" placeholder="Great sound but doesn't offer the best value propostion. Other similar quality earphones for much cheaper." value={description} onChange={e => setDescription(e.target.value)} />
						</Form.Group>
						<Button type='submit'>Save</Button>
					</Form>
				</Container>
			</ContentRight>
			{redirect ? <Redirect to={redirect} /> : ''}
		</>
	)
}
