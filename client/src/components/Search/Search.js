import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = ({ main }) => {
	const [searchTerm, setSearchTerm] = useState();

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	}

	const history = useHistory();
	const handleSubmit = async () => {
		// onSearch(searchTerm);
		history.push(`/feed/search/${searchTerm}`);
	}

	return (
		<div>
			<input onKeyDown={handleKeyDown} className={main ? 'p-2 mr-1 rounded' : 'm-1 p-1 rounded'} placeholder='Search' value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none' }} />
			<FontAwesomeIcon icon={faSearch} onClick={handleSubmit} style={{ cursor: 'pointer', fontSize: (main ? '2rem' : ''), color: 'white' }} />
		</div>
	)
}
