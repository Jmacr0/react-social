import React, { useState, useContext, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToggleContext } from '../../utils/ToggleContext';
import styled from 'styled-components';
import API from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		padding: 0px;
		transition-duration: 0.2s;
	}
	&.closedNav {
		margin-left: 50px;
		padding: 0px;
		transition-duration: 0.2s;
	}
`

export const Profile = () => {
	const toggle = useContext(ToggleContext);
	const [reviewsTotal, setReviewsTotal] = useState();
	const [username, setUsername] = useState();
	const [bio, setBio] = useState();

	const loadUser = async () => {
		const foundUser = await API.user.getCurrentUser();
		setReviewsTotal(foundUser.reviews.length)
		setUsername(foundUser.username);
		setBio(foundUser.bio)
	}

	useEffect(() => {
		loadUser();
	}, [])

	return (
		<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
			<Jumbotron>
				<Row>
					<Col>
						<h2>{username}</h2>
					</Col>
					<Col>
						<Button variant="danger" disabled>
							Total Reviews: <Badge variant="light">{reviewsTotal}</Badge>
							<span className="sr-only">unread messages</span>
						</Button>
					</Col>
					<Col>
						<Link to='/profile/edit'>
							<FontAwesomeIcon style={{ fontSize: '2em', color: 'white' }} icon={faCog} />
						</Link>
					</Col>
				</Row>
			</Jumbotron>
			<Container>
				<Row>
					<Col>
						<p>{bio}</p>
					</Col>
				</Row>
			</Container>
		</ContentRight>
	)
}

