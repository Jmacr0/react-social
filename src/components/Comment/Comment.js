import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

export const Comment = ({ value }) => {
	const [comment] = useState(value);

	return (
		<Card>
			<Card.Header>{comment.author.username} says: </Card.Header>
			<Card.Body>
				<Card.Text>
					{comment.body}
				</Card.Text>
				Posted @ {comment.createdAt}
				{/* <Button variant="primary">Go somewhere</Button> */}
			</Card.Body>
		</Card>
	)
}
