import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';
import Media from 'react-media';

const IconStyle = styled.div`
	&& {
		color: white;
		font-size: 30px;
		width: 200px;
		cursor: pointer;
		transition-duration: 0.2s;
		white-space: nowrap;
		&:hover {
			background-color: #303030;
		}
	}	
`

export const Toggle = () => {
	const { collapse, onClick } = useContext(ToggleContext);

	return (
		<Media queries={{ small: { maxWidth: 599 } }}>
			{matches =>
				matches.small ? (
					<IconStyle
						className='m-0 w-100'
						onClick={() => onClick(collapse ? false : true)}
					>
						<FontAwesomeIcon
							className='mx-2'
							icon={collapse ? faBars : faTimes} />
						{collapse ? '' : <span style={{ fontSize: '1rem', verticalAlign: 'baseline' }}> CLOSE</span>}
					</IconStyle>
				) : (
						<IconStyle
							className='m-0 w-100'
							onClick={() => onClick(collapse ? false : true)}
						>
							<FontAwesomeIcon
								className='mx-2'
								icon={collapse ? faBars : faTimes} />
							{collapse ? '' : <span style={{ fontSize: '1rem', verticalAlign: 'baseline' }}> CLOSE</span>}
						</IconStyle>
					)
			}
		</Media>
	);
}


