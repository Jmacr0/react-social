import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
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

export const Review = () => {
	const toggle = useContext(ToggleContext);

	return (
		<ContentRight className={toggle.collapse ? 'closedNav' : 'openNav'}>
			<Container>
				<h2>Review Here</h2>
			</Container>
		</ContentRight>
	)
}
