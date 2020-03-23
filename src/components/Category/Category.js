import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import akihabara from '../../images/akihabara.jpg';
import { Search } from '../Search/Search';
import { CategoryContext } from '../../utils/CategoryContext';

export const Category = () => {
	const { onChange } = useContext(CategoryContext);
	const [redirect, setRedirect] = useState();

	const categories = [
		{
			name: 'New',
			colour: 'danger',
		},
		{
			name: 'All',
			colour: 'info',
		},
		{
			name: 'Technology',
			colour: 'warning',
		},
		{
			name: 'Fashion',
			colour: 'success'
		},
		{
			name: 'Miscellaneous',
			colour: 'secondary'
		}];

	const handleSelection = (clickedCategory) => {
		onChange(clickedCategory);
		setRedirect('/feed');
	}

	return (
		<>
			<Jumbotron
				style={{ backgroundImage: `url('${akihabara}')`, backgroundSize: 'cover' }}
				fluid
				className='m-0 p-0 text-center'>
				<div
					data-aos="fade-down"
					data-aos-duration="500"
					style={{
						backgroundImage: 'linear-gradient(#0000007c, #0000007c)',
						height: '200px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<h1 style={{ color: 'white', verticalAlign: 'middle' }}>Search a Review</h1>
					<Search main={true} />
				</div>
			</Jumbotron>
			<Container fluid>
				{categories.map((category, index) => {
					return <Row key={index}>
						<Col className='p-0'>
							<Card
								onClick={() => handleSelection(category.name)}
								className='rounded-0'
								bg={category.colour}
								style={{
									cursor: 'pointer',
								}}
							>
								<Card.Body>
									<Card.Title><h3>{(category.name.toUpperCase())}</h3></Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				})}
			</Container>
			{redirect ? <Redirect to={redirect} /> : ''}
		</>
	)
}
