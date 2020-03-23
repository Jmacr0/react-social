import React from "react";
// default context object with properties corresponding to Provider values

export const CategoryContext = React.createContext({
	selection: '',
	search: '',
	onChange: () => undefined,
	onSearch: () => undefined
});
