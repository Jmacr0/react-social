import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import '../../index.css'

export const Comment = ({ value, onDelete }) => {
	const [comment] = useState(value);
	const { id } = useContext(UserContext);

	const handleDelete = async () => {
		const deleteComment = {
			comment: comment._id,
			author: id,
			review: comment.review
		}
		console.log(deleteComment);
		const deleted = await API.comment.deleteComment(deleteComment);
		onDelete();
		handleClose();
	}

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
	}, []);

	return (
		<>
			<Card style={{ border: 'none' }}>
				<Card.Header
					style={{ backgroundColor: '#001936' }}>
					<p style={{ width: '90%', margin: '0px', display: 'inline-block' }}>{comment.author.username} says:</p>
					<span >
						{comment.author._id === id ?
							<>
								<Link to={`/comment/one/edit/${comment._id}`} >
									<FontAwesomeIcon
										style={{ color: 'blanchedalmond', cursor: 'pointer' }}
										icon={faPencilAlt} />
								</Link>

								<FontAwesomeIcon
									onClick={handleShow}
									style={{ color: 'crimson', cursor: 'pointer' }}
									icon={faTrash} />
							</> : ''
						}
					</span>
				</Card.Header>
				<Card.Body style={{ backgroundColor: '#002857' }}>
					<Card.Text>
						{comment.body}
					</Card.Text>
				Posted @ {comment.createdAt}
					{/* <Button variant="primary">Go somewhere</Button> */}
				</Card.Body>
			</Card>
			<Modal
				show={show}
				onHide={handleClose}
				animation={false}
				backdrop='static'
				dialogClassName="my-modal-width"
				centered

			>
				<Modal.Header
					style={{ backgroundColor: '#002857' }} closeButton>
					<Modal.Title>Confirm Comment Delete</Modal.Title>
				</Modal.Header>
				<Modal.Footer
					style={{ backgroundColor: '#00346e' }}>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
</Button>
					<Button variant="danger" onClick={handleDelete}>
						DELETE
</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
