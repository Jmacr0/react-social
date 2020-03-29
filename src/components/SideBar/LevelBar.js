import React, { useContext } from 'react';
import { ProgressBar, Button, Badge, Row, Col } from 'react-bootstrap';
import { ToggleContext } from '../../utils/ToggleContext';
import { UserContext } from '../../utils/UserContext';

export const LevelBar = () => {
	const { collapse } = useContext(ToggleContext);
	const { reviews } = useContext(UserContext);

	return (
		<>
			{collapse ? (
				<Row style={{ height: '50px' }}>
					<Col>
						<Button
							className='rounded-0'
							style={{ height: '38px', transitionDuration: '0.2s' }}
							variant='primary'
							block>
							<Badge variant='light'>{reviews.length}</Badge>
						</Button>
					</Col>
				</Row>
			) : (
					<Row style={{ height: '50px' }} className='mx-auto'>
						<Col>
							<ProgressBar style={{ height: '38px', width: '150px', transitionDuration: '0.2s', borderRadius: '0', fontWeight: 'bold' }} animated variant='primary' now={100} label={`REVIEWS: ${reviews.length}`} />
						</Col>
					</Row>
				)}
			<hr />
		</>
	)
}
