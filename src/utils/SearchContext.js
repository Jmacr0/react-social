import React from "react";
// default context object with properties corresponding to Provider values

export const SearchContext = React.createContext({
	search: '',
	onSearch: () => undefined
});
