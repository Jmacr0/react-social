import React from 'react';
import { Row, Col } from 'react-bootstrap';
import img from '../../images/150.png';

export const DisplayProfile = () => {
	return (
		<React.Fragment>
			<Row className="row mx-auto">
				<Col>
					<hr />
					<img src={img} alt="profile" />
				</Col>
			</Row>
		</React.Fragment>
	)
}
