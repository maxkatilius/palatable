import React from "react";
import Header from "./Header";
import Color from "./Color";
import Modal from "./Modal";
import { generateColors } from "../utils.js";

const Layout = () => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
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

	const generatePalette = () => {
		const newColors = generateColors(
			seedColor,
			mode,
			count - lockedColors.length
		);
		setColors([...lockedColors, ...newColors]);
	};

	console.log(colors);
	// Whenever 'count' changes, regenerate the colors array
	React.useEffect(() => {
		setColors(generateColors(seedColor, mode, count));
	}, [count]);

	// UseEffect for to update the unlocked and locked colors state whenever colors is changed
	React.useEffect(() => {
		console.log(unLockedColors);
		setUnLockedColors(colors.filter((color) => !color.isLocked));
	}, [colors]);

	React.useEffect(() => {
		console.log(lockedColors);
		setLockedColors(colors.filter((color) => color.isLocked));
	}, [colors]);

	// This useEffect adds an event listener to the whole document
	// so that when the user hits the spacebar, it triggers palette generation
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.code === "Space") {
				event.preventDefault();
				generatePalette();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Cleanup: remove the event listener when the component is unmounted
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [seedColor, mode, count, generatePalette]); // Include generatePalette as a dependency

	const colorEls = colors.map((color) => {
		return (
			<Color
				key={color.id}
				color={color}
				colors={colors}
				setColors={setColors}
				setCount={setCount}
				setIsModalVisible={setIsModalVisible}
			/>
		);
	});
	return (
		<div className="site-container">
			<Header
				generatePalette={generatePalette}
				mode={mode}
				setMode={setMode}
				count={count}
				setCount={setCount}
				seedColor={seedColor}
				setSeedColor={setSeedColor}
				colors={setColors}
				setColors={setColors}
				unLockedColors={unLockedColors}
				lockedColors={lockedColors}
			/>
			<main>
				{colorEls}
				{isModalVisible && (
					<Modal
						message="Hex code copied to clipboard!"
						onClose={() => setIsModalVisible(false)}
					/>
				)}
			</main>
		</div>
	);
};

export default Layout;
