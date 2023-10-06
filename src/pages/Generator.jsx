import React from "react";
import { useLocation } from "react-router-dom";

import { useColorContext } from "../context/ColorContext";

import Color from "../components/Color";
import GeneratorFooter from "../components/GeneratorFooter";
import CopyModal from "../components/Modals/CopyModal";
import SaveModal from "../components/Modals/SaveModal";
import SaveDisabledModal from "../components/Modals/SaveDisabledModal";

const Generator = () => {
	const {
		seedColor,
		mode,
		count,
		colors,
		setColors,
		isCopyModalVisible,
		isSaveModalVisible,
		isSaveDisabledModalVisible,
		setIsSaveDisabledModalVisible,
		generatePalette,
		lockedColors,
		resetPalette,
	} = useColorContext();

	const colorEls = colors.map((color) => {
		return <Color key={color.id} color={color} setColors={setColors} />;
	});

	const savePalette = (data) => {
		const paletteId = nanoid();
		localStorage.setItem(paletteId, { ...lockedColors });
	};

	const location = useLocation();

	React.useEffect(() => {
		if (location.pathname === "/") {
			resetPalette();
			// setColors((prevColors) =>
			// 	prevColors.map((color) => ({ ...color, isLocked: false }))
			// );
			// generatePalette();
		}
	}, [location.pathname]);

	// This useEffect adds an event listener to the whole document
	// so that when the user hits the spacebar, it triggers palette generation
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (isSaveModalVisible) {
				return;
			}
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
		<section className="generator flex-col">
			<div className="generator-container flex-col">
				{colorEls}
				{isCopyModalVisible && <CopyModal />}
				{isSaveModalVisible && (
					<SaveModal onClose={() => setIsSaveModalVisible(false)} />
				)}
				{isSaveDisabledModalVisible && (
					<SaveDisabledModal
						onClose={() => setIsSaveDisabledModalVisible(false)}
					/>
				)}
			</div>
			<GeneratorFooter />
		</section>
	);
};

export default Generator;
