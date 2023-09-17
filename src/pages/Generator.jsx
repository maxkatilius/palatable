import React from "react";

import { useColorContext } from "../context/ColorContext";

import Color from "../components/Color";
import GeneratorFooter from "../components/GeneratorFooter";
import CopyModal from "../components/Modals/CopyModal";
import SaveModal from "../components/Modals/SaveModal";

const Generator = () => {
	const {
		seedColor,
		mode,
		count,
		colors,
		setColors,
		isModalVisible,
		isSaveModalVisible,
		generatePalette,
		lockedColors,
	} = useColorContext();

	const colorEls = colors.map((color) => {
		return <Color key={color.id} color={color} setColors={setColors} />;
	});

	const savePalette = (data) => {
		console.log(lockedColors);
		const paletteId = nanoid();
		localStorage.setItem(paletteId, { ...lockedColors });
	};

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
		<main>
			<section>
				{colorEls}
				{isModalVisible && <CopyModal />}
				{isSaveModalVisible && (
					<SaveModal onClose={() => setIsSaveModalVisible(false)} />
				)}
			</section>
			<GeneratorFooter />
		</main>
	);
};

export default Generator;
