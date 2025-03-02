import React, { createContext, useContext } from "react";
import { generateColors, hslToHex } from "../utils";

const ColorContext = createContext();

const useColorContext = () => {
	return useContext(ColorContext);
};

const ColorContextProvider = ({ children }) => {
	// Internal state

	const randomHue = Math.floor(Math.random() * 360);
	const randomSaturation = Math.floor(Math.random() * 100);
	const randomLightness = Math.floor(Math.random() * 100);
	const randomHex = hslToHex(randomHue, randomSaturation, randomLightness);

	const [seedColor, setSeedColor] = React.useState({
		hue: randomHue,
		saturation: randomSaturation,
		lightness: randomLightness,
		hex: randomHex,
	});
	const [mode, setMode] = React.useState("Random");
	const [filter, setFilter] = React.useState("None");
	const [count, setCount] = React.useState(5);
	const [colors, setColors] = React.useState([]);
	const [lockedColors, setLockedColors] = React.useState(
		colors.filter((color) => color.isLocked)
	);
	const [unLockedColors, setUnLockedColors] = React.useState(
		colors.filter((color) => !color.isLocked)
	);
	const [lastColorId, setLastColorId] = React.useState(null);
	const [navOpen, setNavOpen] = React.useState(false);
	const [settingsOpen, setSettingsOpen] = React.useState(false);
	const [isCopyModalVisible, setIsCopyModalVisible] = React.useState(false);
	const [isSaveModalVisible, setIsSaveModalVisible] = React.useState(false);
	const [isSaveDisabledModalVisible, setIsSaveDisabledModalVisible] =
		React.useState(false);

	// Helper functions

	const resetPalette = () => {
		setMode("Random");
		setCount(5);
		setFilter("None");
		setColors(
			generateColors(
				{
					hue: randomHue,
					saturation: randomSaturation,
					lightness: randomLightness,
				},
				mode,
				count,
				filter
			)
		);
		setLockedColors([]);
	};

	const generatePalette = () => {
		const newColors = generateColors(
			seedColor,
			mode,
			count - lockedColors.length,
			filter
		);
		setColors([...lockedColors, ...newColors]);
	};

	// UseEffects

	// Initially populate the colors array
	React.useEffect(() => {
		setColors(generateColors(seedColor, mode, count, filter));
	}, []);

	// UseEffect to update the unlocked and locked colors state whenever colors is changed and update lastColorId
	React.useEffect(() => {
		setUnLockedColors(colors.filter((color) => !color.isLocked));
		setLockedColors(colors.filter((color) => color.isLocked));
		if (colors.length > 0) {
			setLastColorId(colors[colors.length - 1].id);
		}
	}, [colors]);

	return (
		<ColorContext.Provider
			value={{
				seedColor,
				setSeedColor,
				mode,
				setMode,
				filter,
				setFilter,
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
				isCopyModalVisible,
				setIsCopyModalVisible,
				isSaveModalVisible,
				setIsSaveModalVisible,
				isSaveDisabledModalVisible,
				setIsSaveDisabledModalVisible,
				generatePalette,
				resetPalette,
			}}
		>
			{children}
		</ColorContext.Provider>
	);
};

export { useColorContext, ColorContextProvider };
