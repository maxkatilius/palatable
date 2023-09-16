import React from "react";
import Color from "../components/Color";
import Footer from "../components/Footer";
import { useColorContext } from "../context/ColorContext";

const Generator = () => {
	const {
		seedColor,
		mode,
		count,
		colors,
		setColors,
		isModalVisible,
		setIsModalVisible,
		generatePalette,
	} = useColorContext();

	const colorEls = colors.map((color) => {
		return <Color key={color.id} color={color} setColors={setColors} />;
	});

	// UseEffects

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

	return (
		<>
			<main>
				{colorEls}
				{isModalVisible && (
					<Modal
						message="Hex code copied to clipboard!"
						onClose={() => setIsModalVisible(false)}
					/>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Generator;
