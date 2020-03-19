import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faImage } from '@fortawesome/free-solid-svg-icons';

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
		createdAt
	} }) => {

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

	useEffect(() => {
		loadCardColour();
	})

	return (
		<Row className='my-2'>
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
								<Card.Body style={{ height: '200px', overflow: 'hidden' }}>
									<Card.Title>{title}</Card.Title>
									<hr />
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
											<hr />
										</>
									) : ''}
									<Card.Text>
										{description}
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
							written by - {author} @ {createdAt}
						</Card.Footer>
					</Tab.Container>
				</Card>
			</Col>
		</Row >
	)
}
