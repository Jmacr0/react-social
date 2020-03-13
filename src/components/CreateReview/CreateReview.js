import React, { useContext, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';

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
	const [description, setDescription] = useState('');

	const toggle = useContext(ToggleContext);

	const handleSubmit = (event) => {

	}

	return (
		<>
			<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
				<Container className='shadow p-3'>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Item</Form.Label>
							<Form.Control type="text" name='item' value={item} placeholder="'Airpods'" onChange={e => setItem(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlInput2">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" name='title' value={title} placeholder="'Well, that was quite expensive!'" onChange={e => setTitle(e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Rating</Form.Label>
							<div key='inline-radio' className="mb-3">
								{[1, 2, 3, 4, 5].map((rate, index) => {
									return <Form.Check inline key={index} name='ratingSelection' label={rate} type='radio' id={`inline-radio-${rate}`} onChange={() => setRating(rate)} checked={rating === rate} />
								})}
								{/* <Form.Check inline name='ratingSelection' label="1" type='radio' id='inline-radio-1' onChange={() => setRating(1)} checked={rating === 1} />
								<Form.Check inline name='ratingSelection' label="2" type='radio' id='inline-radio-2' onChange={() => setRating(2)} checked={rating === 2} />
								<Form.Check inline name='ratingSelection' label="3" type='radio' id='inline-radio-3' onChange={() => setRating(3)} checked={rating === 3} />
								<Form.Check inline name='ratingSelection' label="4" type='radio' id='inline-radio-4' onChange={() => setRating(4)} checked={rating === 4} />
								<Form.Check inline name='ratingSelection' label="5" type='radio' id='inline-radio-5' onChange={() => setRating(5)} checked={rating === 5} /> */}
							</div>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Your Review</Form.Label>
							<Form.Control as="textarea" rows="4" placeholder="'Great sound but doesn't offer the best value propostion. Other similar quality earphones for much cheaper.'" value={description} onChange={e => setDescription(e.target.value)} />
						</Form.Group>
					</Form>
				</Container>
			</ContentRight>
		</>
	)
}
