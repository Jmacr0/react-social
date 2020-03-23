import React, { useContext } from 'react';
import { ProgressBar, Button, Badge, Row, Col } from 'react-bootstrap';
import { ToggleContext } from '../../utils/ToggleContext';

export const LevelBar = () => {
	const { collapse } = useContext(ToggleContext);

	return (
		<>
			{collapse ? (
				<Row style={{ height: '50px' }}>
					<Col>
						<Button style={{ height: '38px', transitionDuration: '0.2s' }} variant='primary' block>
							<Badge variant='light'>1</Badge>
						</Button>
					</Col>
				</Row>
			) : (
					<Row style={{ height: '50px' }} className='mx-auto'>
						<Col>
							<ProgressBar style={{ height: '38px', width: '150px', transitionDuration: '0.2s', borderRadius: '0' }} animated variant='success' now={70} label='Level 1' />
						</Col>
					</Row>
				)}

		</>
	)
}
