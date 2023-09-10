import React from "react";
import Header from "./Header";
import Color from "./Color";
import Modal from "./Modal";
import { generatePalette, getRandomColors } from "../utils.js";

const Layout = () => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [seedColor, setSeedColor] = React.useState({
		hue: Math.floor(Math.random() * 360),
		saturation: Math.floor(Math.random() * 100),
		lightness: Math.floor(Math.random() * 100),
	});
	const [mode, setMode] = React.useState("Random");
	const [count, setCount] = React.useState(5);
	const [colors, setColors] = React.useState(getRandomColors(5));
	// Whenever 'count' changes, regenerate the colors array
	React.useEffect(() => {
		setColors(getRandomColors(count));
	}, [count]);

	// This useEffect adds an event listener to the whole document
	// so that when the user hits the spacebar, it triggers palette generation
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.code === "Space") {
				event.preventDefault(); // prevent default spacebar actions (like scrolling)
				setColors(generatePalette(seedColor, mode, count));
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Cleanup: remove the event listener when the component is unmounted
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [seedColor, mode, count]);

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
				mode={mode}
				setMode={setMode}
				count={count}
				setCount={setCount}
				seedColor={seedColor}
				setSeedColor={setSeedColor}
				setColors={setColors}
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
