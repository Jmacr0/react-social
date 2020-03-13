import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const IconStyle = styled.div`
	&& {
		font-size: 30px;
		margin-left: 5px;		
	}

	.whiteFont {
		color: white;
		
		&:hover {
			transition-duration: 0.2s;
			color: red;
		}
	}
`;

export const IconLink = ({ link, iconStyle }) => {
	return (
		<>
			<IconStyle>
				<Link to={link} className='whiteFont'>
					<FontAwesomeIcon icon={iconStyle} />
				</Link>
			</IconStyle>
		</>
	)
}
