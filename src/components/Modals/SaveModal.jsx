import React from "react";
import { nanoid } from "nanoid";
import { useColorContext } from "../../context/ColorContext";
import { randomPaletteNames } from "./randomPaletteNames";
import { VscChromeClose } from "react-icons/vsc";

const SaveModal = () => {
	const { isSaveModalVisible, setIsSaveModalVisible, lockedColors } =
		useColorContext();
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");

	const generateRandomPaletteName = () => {
		const randomPaletteName =
			randomPaletteNames[
				Math.floor(Math.random() * randomPaletteNames.length)
			];
		// const number = localStorage.length;
		// console.log(number);
		return `${randomPaletteName}...`;
	};

	const handleSave = () => {
		const paletteId = nanoid();
		const newPalette = {
			id: paletteId,
			name: name,
			description: description,
			colors: lockedColors,
		};

		const existingPalettes =
			JSON.parse(localStorage.getItem("my-palettes")) || [];

		existingPalettes.push(newPalette);

		localStorage.setItem("my-palettes", JSON.stringify(existingPalettes));

		setIsSaveModalVisible(false);
	};

	if (!isSaveModalVisible) {
		return null;
	}

	const palettePreviewEls = () => {
		return lockedColors.map((lockedColor) => {
			const previewStyle = {
				backgroundColor: lockedColor.hex,
			};
			return (
				<div
					key={lockedColor.hex}
					className="palette-preview-color"
					style={previewStyle}
				></div>
			);
		});
	};

	return (
		<div
			className={`modal-container save-modal-container ${
				isSaveModalVisible ? "slide-in" : "slide-out"
			}`}
		>
			<div className="save-modal-content flex-col">
				<VscChromeClose
					className="icon cancel-save-icon"
					onClick={() => {
						setIsSaveModalVisible(false);
					}}
				/>
				<div className="palette-preview">{palettePreviewEls()}</div>
				<input
					type="text"
					placeholder={generateRandomPaletteName()}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					placeholder="Write a description..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button
					className="btn save-palette-btn"
					onClick={() => handleSave()}
				>
					Save palette!
				</button>
			</div>
		</div>
	);
};

export default SaveModal;
