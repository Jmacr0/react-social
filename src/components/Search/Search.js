import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../utils/SearchContext';

export const Search = ({ main }) => {
	const { onSearch } = useContext(SearchContext);
	const [redirect, setRedirect] = useState();
	const [searchTerm, setSearchTerm] = useState();

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	}

	const handleSubmit = async () => {
		setRedirect('/feed')
		onSearch(searchTerm);
	}

	return (
		<div>
			<input onKeyDown={handleKeyDown} className={main ? 'p-2 mr-1 rounded' : 'm-1 p-1 rounded'} placeholder='Search' value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none' }} />
			<FontAwesomeIcon icon={faSearch} onClick={handleSubmit} style={{ cursor: 'pointer', fontSize: (main ? '2rem' : ''), color: 'white' }} />
			{redirect ? <Redirect to='/feed' /> : ''}
		</div>
	)
}
