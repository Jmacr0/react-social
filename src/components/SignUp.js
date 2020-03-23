import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

export const SignUp = ({ onAuthenticate }) => {

	const [toggleLogin, setToggleLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [alert, setAlert] = useState({
		message: '',
		type: ''
	});

	const [redirect, setRedirect] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		setAlert('');
		if (!toggleLogin) {
			if (!username || !email || !password || !confirmPassword) {
				setAlert({
					message: 'Please fill out all fields.',
					type: 'warning'
				});
				return;
			}
			if (password !== confirmPassword) {
				setAlert({
					message: 'Passwords do not match.',
					type: 'warning'
				});
				return;
			}
			const newUser = {
				username,
				email,
				password,
				confirmPassword
			}
			API.user.saveUser(newUser)
				.then(success => {
					setAlert({
						message: 'Successfully Signed Up!',
						type: 'success'
					});
					setToggleLogin(true);
				})
				.catch(err => {
					console.log(err);
				})
		}

		if (toggleLogin) {
			if (!username || !password) {
				setAlert({
					message: 'Please fill out all fields.',
					type: 'warning'
				})
				return;
			}
			const existingUser = {
				username,
				password
			}
			API.user.loginUser(existingUser)
				.then(redirectRoute => {
					onAuthenticate(true);
					setRedirect(redirectRoute);
				})
				.catch(err => {
					setAlert({
						message: 'Login attempt failed. Combination Incorrect.',
						type: 'danger'
					})
				})
		}
	}

	return (
		<Container>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Form onSubmit={handleSubmit} className='shadow'>
						{alert.type ? (
							<Row>
								<Col>
									<Alert variant={alert.type}>
										{alert.message}
									</Alert>
								</Col>
							</Row>
						) : ''
						}
						<Row className='px-3 pb-3'>
							<Col>
								<Button
									variant='info'
									onClick={() => {
										setToggleLogin(toggleLogin ? false : true)
										setUsername('');
										setEmail('');
										setPassword('');
										setConfirmPassword('');
									}
									}>
									{toggleLogin ? 'New User? Signup here!' : 'Existing User? Login here!'}
								</Button>
								{toggleLogin ? (
									<>
										<h2>Login</h2>
										<Form.Group controlId="formBasicUsername">
											<Form.Label>Username</Form.Label>
											<Form.Control type="text" value={username || ''} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
										</Form.Group>
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control type="password" value={password || ''} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
										</Form.Group>
										<Form.Group controlId="formBasicCheckbox">
											<Form.Check type="checkbox" label='Remember Me' />
										</Form.Group>
									</>
								) : (
										<>
											<h2>Sign Up</h2>
											<Form.Group controlId="formBasicUsername">
												<Form.Label>Username</Form.Label>
												<Form.Control type="text" value={username || ''} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicEmail">
												<Form.Label>Email address</Form.Label>
												<Form.Control type="email" value={email || ''} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicPassword">
												<Form.Label>Password</Form.Label>
												<Form.Control type="password" value={password || ''} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicConfirmPassword">
												<Form.Label>Confirm Password</Form.Label>
												<Form.Control type="password" value={confirmPassword || ''} placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
											</Form.Group>
										</>
									)}
							</Col>
						</Row>
						<Button variant="primary btn-block rounded-0" type="submit">
							Submit
  				</Button>
					</Form>
				</Col>
			</Row>
			{redirect ? <Redirect to={redirect} /> : ''}
		</Container >
	)
}
