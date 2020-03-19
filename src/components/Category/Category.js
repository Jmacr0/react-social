import React, { useContext, useState } from 'react';
import { ToggleContext } from '../../utils/ToggleContext';
import styled from 'styled-components';
import { Container, Row, Col, Card, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import akihabara from '../../images/akihabara.jpg';
import { Search } from '../Search/Search';

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

export const Category = () => {
	const toggle = useContext(ToggleContext);

	const [redirect, setRedirect] = useState();

	const categories = [
		{
			name: 'New',
			colour: 'danger'
		},
		{
			name: 'All',
			colour: 'info',
			redirect: '/feed'
		},
		{
			name: 'Technology',
			colour: 'warning'
		},
		{
			name: 'Fashion',
			colour: 'success'
		},
		{
			name: 'Miscellaneous',
			colour: 'secondary'
		}];

	return (
		<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
			<Jumbotron
				style={{ backgroundImage: `url('${akihabara}')`, backgroundSize: 'cover' }}
				fluid
				className='m-0 p-0 text-center'>
				<div style={{
					backgroundImage: 'linear-gradient(#0000007c, #0000007c)',
					height: '200px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<h1 style={{ color: 'white', verticalAlign: 'middle' }}>Search a Review</h1>
					<Search />
				</div>
			</Jumbotron>
			<Container fluid>
				{categories.map((category, index) => {
					return <Row key={index}>
						<Col className='p-0'>
							<Card
								onClick={() => setRedirect(category.redirect)}
								className='rounded-0'
								style={{ cursor: 'pointer' }} bg={category.colour}>
								<Card.Body>
									<Card.Title><h2>{category.name}</h2></Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				})}
			</Container>
			{redirect ? <Redirect to={redirect} /> : ''}
		</ContentRight >
	)
}
