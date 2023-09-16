import React, { createContext, useContext, useState } from "react";
import { generateColors } from "../utils";

const ColorContext = createContext();

const useColorContext = () => {
	return useContext(ColorContext);
};

const ColorContextProvider = ({ children }) => {
	// Internal state

	const [seedColor, setSeedColor] = React.useState({
		hue: Math.floor(Math.random() * 360),
		saturation: Math.floor(Math.random() * 100),
		lightness: Math.floor(Math.random() * 100),
	});
	const [mode, setMode] = React.useState("Vibrant");
	const [count, setCount] = React.useState(5);
	const [colors, setColors] = React.useState([]);
	const [lockedColors, setLockedColors] = React.useState(
		colors.filter((color) => color.isLocked)
	);
	const [unLockedColors, setUnLockedColors] = React.useState(
		colors.filter((color) => !color.isLocked)
	);
	const [lastColorId, setLastColorId] = React.useState(null);
	const [navOpen, setNavOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	// Helper functions

	const generatePalette = () => {
		const newColors = generateColors(
			seedColor,
			mode,
			count - lockedColors.length
		);
		setColors([...lockedColors, ...newColors]);
	};

	// UseEffects

	// Initially populate the colors array
	React.useEffect(() => {
		setColors(generateColors(seedColor, mode, count));
	}, []);

	// UseEffect for to update the unlocked and locked colors state whenever colors is changed and update lastColorId
	React.useEffect(() => {
		setUnLockedColors(colors.filter((color) => !color.isLocked));
		setLockedColors(colors.filter((color) => color.isLocked));
		if (colors.length > 0) {
			setLastColorId(colors[colors.length - 1].id);
		}
		console.log(lastColorId);
	}, [colors]);

	return (
		<ColorContext.Provider
			value={{
				seedColor,
				setSeedColor,
				mode,
				setMode,
				count,
				setCount,
				colors,
				setColors,
				lockedColors,
				setLockedColors,
				unLockedColors,
				setUnLockedColors,
				lastColorId,
				navOpen,
				setNavOpen,
				settingsOpen,
				setSettingsOpen,
				isModalVisible,
				setIsModalVisible,
				generatePalette,
			}}
		>
			{children}
		</ColorContext.Provider>
	);
};

export { useColorContext, ColorContextProvider };
