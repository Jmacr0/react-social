import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleContext } from '../../utils/ToggleContext';
import Media from 'react-media';

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
			background-color: #00346e;
			color: #ccefff;
		}

		&:focus {
			background-color: #00346e;
			border-left: 3px solid blue;
		}
	}
`

const LinkStyleSmall = styled.span`
	.link {
		padding: 6px 8px 6px 16px;
		text-decoration: none;
		font-size: 20px;				
		cursor: pointer;
		color: white;
		transition-duration: 0.4s;
		white-space: nowrap;
		
		&:hover {
			background-color: #00346e;
			color: #ccefff;
		}

		&:focus {
			background-color: #00346e;
			border-left: 3px solid blue;
		}
	}
`

export const MenuLink = ({ value, link, onLogout, iconStyle }) => {
	const { collapse } = useContext(ToggleContext);

	const linkType =
		<>
			<Link to={link ? link : ''} onClick={(onLogout ? () => onLogout() : '')} replace className='link'>
				<FontAwesomeIcon icon={iconStyle} className='mr-2' />
				<Media queries={{ small: { maxWidth: 599 } }}>
					{matches =>
						matches.small ? (
							''
						) : (
								<>
									{collapse ? '' : value}
								</>
							)
					}
				</Media>
			</Link>
		</>


	return (
		<Media queries={{ small: { maxWidth: 599 } }}>
			{matches =>
				matches.small ? (
					<>
						<LinkStyleSmall>
							{linkType}
						</LinkStyleSmall>
					</>
				) : (
						<>
							<LinkStyle>
								{linkType}
							</LinkStyle>
						</>
					)
			}
		</Media>
	)
}
