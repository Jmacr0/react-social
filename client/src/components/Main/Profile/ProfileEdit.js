import React, { useState, useEffect, useContext } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import API from '../../../utils/API';
import { UserContext } from '../../../utils/UserContext';

export const ProfileEdit = () => {
	const { loadUser } = useContext(UserContext);

	const [toggleEdit, setToggleEdit] = useState(true);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [bio, setBio] = useState('');
	const [img, setImg] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const [alert, setAlert] = useState({
		message: '',
		type: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (toggleEdit) {
				setAlert({
					message: '',
					type: ''
				});
				// save details
				if (!username || !email || !bio || !img) {
					setAlert({
						message: 'Please fill out all fields.',
						type: 'warning'
					});
					return;
				}
				const validate = await API.user.getExisting({
					username,
					email
				});
				console.log("validate: ", validate)
				if (validate && !validate.isLogged) {
					setAlert({
						message: 'Username or Email already exists.',
						type: 'warning'
					});
					return;
				}
				const updateUser = {
					username,
					email,
					bio,
					img
				}
				console.log(updateUser);
				const update = await API.user.updateUser(updateUser);
				if (update) {
					setAlert({
						message: 'Details updated successfully.',
						type: 'success'
					});
					loadUser();
					return;
				}
			}
			if (!toggleEdit) {
				setAlert({
					message: '',
					type: ''
				});
				// save password
				if (!newPassword || !confirmNewPassword) {
					setAlert({
						message: 'Please fill out all fields.',
						type: 'warning'
					});
					return;
				}
				if (newPassword !== confirmNewPassword) {
					setAlert({
						message: 'Passwords do not match.',
						type: 'warning'
					});
					return;
				}
				const update = await API.user.updateUserPassword({ currentPassword, newPassword });
				setAlert({
					message: update.message,
					type: update.type
				});
				setTimeout(() => {
					setAlert({
						message: '',
						type: ''
					});
				}, 1000);
				loadUser();
				return;

			}
		} catch (err) {
			console.log(err.message)
			setAlert({
				message: 'Failed to update. Try again.',
				type: 'danger'
			});
			return;
		}
	}

	const setUser = async () => {
		const foundUser = await API.user.getCurrentUser();
		const { username, email, bio, img } = foundUser;
		setUsername(username);
		setEmail(email);
		setBio(bio);
		setImg(img);
	}

	useEffect(() => {
		setUser();
	}, [])

	return (
		<>
			<Container style={{ backgroundColor: '#00346e' }} fluid>
				<Row>
					<Col>
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
									<h2>Edit Profile</h2>
									<Button
										variant='info'
										onClick={() => setToggleEdit(toggleEdit ? false : true)}
									>
										{toggleEdit ? 'Change Password' : 'Edit Details'}
									</Button>
									{toggleEdit ? (
										<>
											<Form.Group controlId="formBasicUsername">
												<Form.Label>Username</Form.Label>
												<Form.Control type="text" value={username || ''} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicEmail">
												<Form.Label>Email address</Form.Label>
												<Form.Control type="email" value={email || ''} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicBio">
												<Form.Label>Bio</Form.Label>
												<Form.Control as="textarea" value={bio || ''} placeholder="Enter bio" onChange={(e) => setBio(e.target.value)} />
											</Form.Group>
											<Form.Group controlId="formBasicImg">
												<Form.Label>Profile Image (URL)</Form.Label>
												<Form.Control type='text' value={img || ''} placeholder="Enter bio" onChange={(e) => setImg(e.target.value)} />
											</Form.Group>
										</>
									) : (
											<>
												<Form.Group controlId="formBasicCurrentPassword">
													<Form.Label>Current Password</Form.Label>
													<Form.Control type="password" value={currentPassword || ''} placeholder="Password" onChange={(e) => setCurrentPassword(e.target.value)} />
												</Form.Group>
												<Form.Group controlId="formBasicNewPassword">
													<Form.Label>New Password</Form.Label>
													<Form.Control type="password" value={newPassword || ''} placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
												</Form.Group>
												<Form.Group controlId="formBasicConfirmNewPassword">
													<Form.Label>Confirm New Password</Form.Label>
													<Form.Control type="password" value={confirmNewPassword || ''} placeholder="Password" onChange={(e) => setConfirmNewPassword(e.target.value)} />
												</Form.Group>
											</>)}
								</Col>
							</Row>
							<Button variant="primary btn-block rounded-0" type="submit">
								{toggleEdit ? 'Save Details' : 'Set New Password'}
							</Button>
						</Form>
					</Col>
				</Row>
			</Container >
		</>
	)
}
