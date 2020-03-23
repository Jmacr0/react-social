import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';

export const Profile = () => {
	const [reviewsTotal, setReviewsTotal] = useState()
	const { username, bio, reviews } = useContext(UserContext);

	return (
		<>
			<Jumbotron
				className='p-0'
				style={{ height: '70vh' }}
			>
				<Row style={{ height: '100%' }} noGutters>
					<Col xs={12} md={6} style={{ height: '100%' }}>
						<h2>Welcome {username}</h2>
					</Col>
					<Col
						xs={12}
						md={6}
						style={{ height: '100%', backgroundColor: '#ff4747' }}>
						<Row
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							noGutters>
							<Col>
								<h2>
									Total Reviews:
								</h2>
							</Col>
						</Row>
						<Row noGutters>
							<Col>
								<h2>
									<Badge variant="light">{reviews.length}</Badge>
								</h2>
							</Col>
						</Row>
					</Col>
				</Row>
			</Jumbotron>
			<Container>
				<Row>
					<Col>
						<h2>Bio:</h2>
						<p>{bio}</p>
					</Col>
					<Col>
						<Link to='/profile/edit'>
							<FontAwesomeIcon style={{ fontSize: '2em', color: 'white' }} icon={faCog} />
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	)
}

