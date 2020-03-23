import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleContext } from '../../utils/ToggleContext';

const LinkStyle = styled.div`
	.link {
		padding: 6px 8px 6px 16px;
		text-decoration: none;
		font-size: 20px;
		display: block;					
		cursor: pointer;
		color: white;
		transition-duration: 0.4s;
		white-space: nowrap;
		
		&:hover {
			background-color: #333;
			color: red;
		}

		&:focus {
			background-color: #333;
			border-left: 3px solid red;
		}
	}
`

export const MenuLink = ({ value, link, onLogout, iconStyle }) => {
	const { collapse } = useContext(ToggleContext);

	const linkType = link ?
		(
			<>
				<Link to={link} replace className='link'>
					<FontAwesomeIcon icon={iconStyle} className='mr-2' />
					{collapse ? '' : value}
				</Link>
			</>
		) :
		(
			<>
				<Link to='' onClick={() => onLogout()} className='link'>
					<FontAwesomeIcon icon={iconStyle} className='mr-2' />
					{collapse ? '' : value}
				</Link>
			</>
		)

	return (
		<>
			<LinkStyle>
				{linkType}
			</LinkStyle>
		</>
	)
}
