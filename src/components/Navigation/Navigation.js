import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Search } from '../Search/Search';
import { ToggleContext } from '../../utils/ToggleContext';
import Media from 'react-media';

const NavStyle = styled.div`
	background-image: linear-gradient(#0271f1, #00c3ff);

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

const styles = {
	openNav: {
		marginLeft: '220px',
		padding: '0px 10px',
		transitionDuration: '0.2s'
	},
	closedNav: {
		marginLeft: '50px',
		padding: '0px 10px',
		transitionDuration: '0.2s'
	}
}


export const Navigation = () => {
	const { collapse } = useContext(ToggleContext);

	const location = useLocation();

	return (

		<Media queries={{ small: { maxWidth: 599 } }}>
			{matches =>
				matches.small ? (
					<Navbar
						expand="lg"
						sticky="top"
						className='p-0'
					>
						<NavStyle style={{ width: '100%' }}>
							<Container fluid>
								<Row>
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
								</Row>
							</Container>
						</NavStyle>
					</Navbar >
				) : (
						<Navbar
							expand="lg"
							sticky="top"
							className='p-0'
							style={collapse ? styles.closedNav : styles.openNav}
						>
							<NavStyle style={{ width: '100%' }}>
								<Container fluid>
									<Row>
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
									</Row>
								</Container>
							</NavStyle>
						</Navbar >
					)
			}
		</Media>
	)
}
