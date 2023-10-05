import React from "react";

import { useColorContext } from "../context/ColorContext";
import { famousPalettes } from "../famousPalettes";

import CopyModal from "../components/Modals/CopyModal";

import { hexToHSL, getContrastingTextColor, copyToClipboard } from "../utils";

const Famous = () => {
	const { isCopyModalVisible, setIsCopyModalVisible } = useColorContext();
	const famousPaletteEls = famousPalettes.map((palette) => {
		const colorEls = palette.colors.map((hex) => {
			const hsl = hexToHSL(hex);
			const textColor = getContrastingTextColor(hsl[0], hsl[1], hsl[2]);
			return (
				<div
					key={hex}
					className="famous-palette-color"
					style={{
						backgroundColor: hex,
						color: textColor,
						cursor: "pointer",
					}}
					onClick={() => {
						copyToClipboard(`${hex.slice(1)}`);
						setIsCopyModalVisible(true);
						setTimeout(() => {
							setIsCopyModalVisible(false); // auto-hide modal after 2 seconds
						}, 2000);
					}}
				>
					{isCopyModalVisible && <CopyModal />}
					{hex}
				</div>
			);
		});
		return (
			<div
				key={palette.name}
				className="famous-palette-container flex-between"
			>
				<div className="famous-palette-info">
					<h3>{palette.name}</h3>
					<p>{palette.artist}</p>
					<div className="famous-palette-colors flex-col">
						{colorEls}
					</div>
				</div>
				<img src={palette.imgUrl} />
			</div>
		);
	});

	return (
		<section className="famous flex-col">
			<h1>Famous Palettes</h1>
			<p>Get a little inspiration from the pros...</p>
			{famousPaletteEls}
		</section>
	);
};

export default Famous;
