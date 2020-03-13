import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const SignUp = () => {
	return (
		<Container>
			<Form className='shadow'>
				<Row className='p-3'>
					<Col>
						<h2>Social Login</h2>
					</Col>
				</Row>
				<hr />
				<Row className='p-3'>
					<Col>
						<h2>Login</h2>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label='Remember Me' />
						</Form.Group>
					</Col>
					<Col>
						<h2>Sign Up</h2>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary btn-block rounded-0" type="submit">
					Submit
  				</Button>
			</Form>
		</Container>
	)
}
