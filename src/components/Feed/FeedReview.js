import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FeedReview = ({ review: { title, body, author } }) => {
	return (
		<Row className='my-2'>
			<Col>
				<Card>
					<Card.Header>{title}</Card.Header>
					<Card.Body>
						<Card.Title></Card.Title>
						<Card.Text>
							{body}
						</Card.Text>
						<Link to='/review'>Open</Link >
						<footer>
							written by - {author}
						</footer>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}
