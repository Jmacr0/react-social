import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ToggleContext } from '../../utils/ToggleContext';

const IconStyle = styled.div`
	&& {
		color: white;
		font-size: 30px;
		margin-right: 10px;
		width: 200px;		
	}	

	.cursor {
		cursor: pointer;
	}

	.arrow {
		color: grey;
		animation-name: tap;
		animation-duration: 0.5s;
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(1, 1, 1, 0.2);
	}

	@keyframes tap {
		from {margin-left: 0px;}
		to {margin-left: 10px;}
	}
`

export const Toggle = () => {
	const { collapse, onClick } = useContext(ToggleContext);
	const arrow = collapse ? '' : <FontAwesomeIcon icon={faLongArrowAltLeft} className='arrow' />;

	return (
		<IconStyle>
			<FontAwesomeIcon onClick={() => onClick(collapse ? false : true)} icon={faAddressCard} className='cursor ml-2' />
			{arrow}
		</IconStyle>
	);
}


