import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToggleContext } from '../../utils/ToggleContext';
import styled from 'styled-components';

const ContentRight = styled.div`
	&.openNav {
		margin-left: 220px;
		padding: 0px 10px;
	}
	&.closedNav {
		margin-left: 50px;
		padding: 0px 10px;
	}
`

export const Profile = () => {
	const toggle = useContext(ToggleContext);

	return (
		<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
			<Container>
				<Row>
					<Col>
						<h2>Username</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum totam explicabo nostrum aspernatur nobis nulla atque nemo quos, adipisci est eos iure quasi, dignissimos inventore consectetur aperiam sequi perspiciatis quidem?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quae molestias et quas iste consectetur amet eligendi saepe laudantium voluptate, consequuntur atque eos harum provident dolore at, molestiae impedit! Voluptas!</p>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum totam explicabo nostrum aspernatur nobis nulla atque nemo quos, adipisci est eos iure quasi, dignissimos inventore consectetur aperiam sequi perspiciatis quidem?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quae molestias et quas iste consectetur amet eligendi saepe laudantium voluptate, consequuntur atque eos harum provident dolore at, molestiae impedit! Voluptas!</p>
					</Col>
				</Row>
			</Container>
		</ContentRight>
	)
}

