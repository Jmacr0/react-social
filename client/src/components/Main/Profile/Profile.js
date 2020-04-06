import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../../utils/UserContext';
import { FeedReview } from '../Feed/FeedReview';

export const Profile = () => {
	const { username, bio, reviews } = useContext(UserContext);

	const descReviews = React.useMemo(() => {
		return reviews.slice(0).reverse();
	}, [reviews]);

	return (
		<>
			<Container style={{ backgroundColor: '#00346e' }} className='text-center' fluid>
				<Row noGutters>
					<Col style={{
						height: '20vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<h2 className='my-auto'>Welcome back, {username}!</h2>
					</Col>
				</Row>
				<Row noGutters>
					<Col>
						<Jumbotron style={{ backgroundColor: '#002857' }} fluid>
							<h2>Total Reviews: {reviews.length}</h2>
						</Jumbotron>
					</Col>
				</Row>
				<Row noGutters>
					<Col>
						<h3>About Me:</h3>
						<p>{bio}</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to='/profile/edit'>
							Edit Your Profile
							<FontAwesomeIcon icon={faCog} />
						</Link>
					</Col>
				</Row>
			</Container>
			<Container style={{ backgroundColor: '#00346e' }} fluid>
				<Row>
					<Col
						style={{
							height: '20vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
						className='text-center'>
						<h2>My Reviews</h2>
					</Col>
				</Row>
				{descReviews.map((review, index) =>
					<FeedReview review={review} key={index} />
				)}
			</Container>
		</>
	)
}

