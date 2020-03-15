import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkStyle = styled.div`
	.link {
		padding: 6px 8px 6px 16px;
		text-decoration: none;
		font-size: 25px;
		display: block;					
		cursor: pointer;
		color: white;
		transition-duration: 0.4s;
		white-space: nowrap;
		
		&:hover {
			background-color: #333;
			color: red;
		}
	}
`

export const Button = ({ value, link, onLogout }) => {

	const linkType = link ?
		(
			<>
				<Link to={link} replace className='link'>
					{value}
				</Link>
			</>
		) :
		(
			<>
				<Link to='' onClick={() => onLogout()} className='link'>
					{value}
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
