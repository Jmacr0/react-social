import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToggleContext } from '../../utils/ToggleContext';
import { UserContext } from '../../utils/UserContext';

export const DisplayProfile = () => {
	const { collapse } = useContext(ToggleContext);
	const { img } = useContext(UserContext);
	return (
		<>
			<Row className="row mx-auto">
				<Col>
					<hr />
					<img
						src={img}
						alt="profile"
						style={{ visibility: (collapse ? 'hidden' : 'visible'), transitionDuration: '0.2s', objectFit: 'cover', height: '150px', width: '150px' }}
					/>
				</Col>
			</Row>
		</>
	)
}
