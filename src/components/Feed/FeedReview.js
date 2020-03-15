import React from 'react';
import { Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faImage, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const FeedReview = ({ review: { author, item, title, rating, category, pros, cons, description, img, createdAt } }) => {

	const cardColour = () => {
		switch (category) {
			case 'Technology':
				return 'warning';
			case 'Fashion':
				return 'success';
			case 'Miscellaneous':
				return 'secondary';
			default: return 'secondary';
		}
	}

	return (
		<Row className='my-2'>
			<Col>
				<Card bg={cardColour()} text='light'>
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
									<Link style={{ color: 'white', textDecoration: 'none' }} to='/review'>. . .</Link>
								</Nav.Item>
							</Nav>
						</Card.Header>
						<Tab.Content>
							<Tab.Pane eventKey='main'>
								<Card.Body style={{ height: '160px', overflow: 'hidden' }}>
									<Card.Title>{title}</Card.Title>
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
