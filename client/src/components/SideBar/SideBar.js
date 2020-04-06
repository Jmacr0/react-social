import React, { useContext } from 'react';
import styled from 'styled-components'
import { DisplayProfile } from './DisplayProfile';
import { Menus } from './Menus';
import { Toggle } from './Toggle';
import { ToggleContext } from '../../utils/ToggleContext';
import { LevelBar } from './LevelBar';
import Media from 'react-media';

const SideNav = styled.div`
		height: 100%; 
		width: 220px; 
		position: fixed;
		z-index: 9999;
		top: 0; 
		left: 0;
		background-image: linear-gradient(to right, #001936, #001f42, #001936);
		overflow-x: hidden;
		transition: 0.2s;

		&.closed {
			width: 50px;
			transition: 0.2s;
		}
`;

const SideNavResponsive = styled.div`
		height: 80px; 
		width: 100%;
		position: fixed;
		z-index: 9999;
		background-image: linear-gradient(#001936, #001f42, #001936);
		overflow: hidden;
		transition: 0.2s;

		&.closed {
			height: 40px;
			transition: 0.2s;
		}
`


export const SideBar = () => {
	const { collapse } = useContext(ToggleContext);

	return (
		<>
			<Media queries={{ small: { maxWidth: 599 } }}>
				{matches =>
					matches.small ? (
						<SideNavResponsive className={collapse ? 'closed' : ''}>
							<Toggle />
							<Menus />
						</SideNavResponsive>
					) : (
							<SideNav className={collapse ? 'closed' : ''}>
								<Toggle />
								<DisplayProfile />
								<LevelBar />
								<Menus />
							</SideNav>
						)
				}
			</Media>
		</>
	)
}
