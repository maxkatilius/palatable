import React, { createContext, useContext } from "react";

const OverlayContext = createContext();

const useOverlayContext = () => {
	return useContext(OverlayContext);
};

const OverlayContextProvider = ({ children }) => {
	const [navOpen, setNavOpen] = React.useState(false);
	const [settingsOpen, setSettingsOpen] = React.useState(false);

	return (
		<OverlayContext.Provider
			value={{
				navOpen,
				setNavOpen,
				settingsOpen,
				setSettingsOpen,
			}}
		>
			{children}
		</OverlayContext.Provider>
	);
};

export { useOverlayContext, OverlayContextProvider };
