import React from "react";
// default context object with properties corresponding to Provider values

export const UserContext = React.createContext({
	id: '',
	username: '',
	email: '',
	bio: '',
	img: '',
	experience: '',
	reviews: [],
	favourites: [],
	comments: [],
});
