import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Search } from '../Search/Search';
import { ToggleContext } from '../../utils/ToggleContext';

const NavStyle = styled.div`
	background-image: linear-gradient(#0271f1, #00c3ff);

	.openNav {
		margin-left: 220px;
		padding: 0px 10px;
		transition-duration: 0.2s;
	}

	.closedNav {
		margin-left: 50px;
		padding: 0px 10px;
		transition-duration: 0.2s;
	}

	.search {
		opacity: 0.5;
	}

	.homeIcon {
		color: white;
		font-size: 30px;
		transition-duration: 0.2s;

		&:hover {
			color: grey;
		}
	}
`

export const Navigation = () => {
	const { collapse } = useContext(ToggleContext);

	const location = useLocation();

	return (
		<NavStyle>
			<Navbar
				expand="lg"
				sticky="top"
				className={(collapse ? 'closedNav' : 'openNav')}
			>
				<Container>
					<div
						className="mr-auto search"
						style={{ visibility: (location.pathname === '/' ? 'hidden' : 'visible') }}>
						<Search />
					</div>
					<div className='ml-auto'>
						<Link to='/' replace>
							<FontAwesomeIcon icon={faHome} className='homeIcon' />
						</Link>
					</div>
				</Container>
			</Navbar>
		</NavStyle>
	)
}
