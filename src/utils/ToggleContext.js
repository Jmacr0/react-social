import React from "react";
// default context object with properties corresponding to Provider values

export const ToggleContext = React.createContext({
	collapse: false,
	onClick: () => undefined
});
