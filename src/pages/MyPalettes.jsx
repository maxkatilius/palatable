import React from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

import CopyModal from "../components/Modals/CopyModal";

import { copyToClipboard, getContrastingTextColor } from "../utils";
import { useColorContext } from "../context/ColorContext";

import { VscChromeClose } from "react-icons/vsc";
import { BiDownload } from "react-icons/bi";
import { GiBottomRight3DArrow } from "react-icons/gi";

const MyPalettes = () => {
	const [savedPalettes, setSavedPalettes] = React.useState([]);
	React.useEffect(() => {
		const palettesFromLocalStorage =
			JSON.parse(localStorage.getItem("my-palettes")) || [];
		setSavedPalettes(palettesFromLocalStorage);
	}, []);

	const { isCopyModalVisible, setIsCopyModalVisible } = useColorContext();

	const downloadPaletteImage = async (paletteName) => {
		const original = document.getElementById(`palette-${paletteName}`);
		if (!original) return;

		// Clone the element
		const clone = original.cloneNode(true);
		clone.style.borderRadius = "0";
		clone.style.position = "absolute";
		clone.style.top = "-9999px";
		clone.style.left = "-9999px";
		document.body.appendChild(clone);

		const swatchDivs = clone.querySelectorAll(".saved-palette-color");
		swatchDivs.forEach((div) => {
			div.style.display = "flex";
			div.style.flexDirection = "column";
			div.style.justifyContent = "flex-end";
			div.style.alignItems = "center";
			div.style.height = "8em";
		});

		const hexTexts = clone.querySelectorAll("p");
		hexTexts.forEach((p) => {
			p.style.fontSize = "0.4rem";
			p.style.margin = "0";
			p.style.padding = "1em";
			p.style.letterSpacing = "0.03rem";
		});

		// Capture image
		const canvas = await html2canvas(clone, {
			backgroundColor: null,
		});
		const imgURL = canvas.toDataURL("image/png");

		// Clean up
		document.body.removeChild(clone);

		// Trigger download
		const link = document.createElement("a");
		link.href = imgURL;
		link.download = `${paletteName}.png`;
		link.click();
	};

	const unsavePalette = (paletteId) => {
		const existingPalettes = [...savedPalettes];

		const updatedPalettes = existingPalettes.filter(
			(palette) => palette.id !== paletteId
		);

		localStorage.setItem("my-palettes", JSON.stringify(updatedPalettes));

		setSavedPalettes(updatedPalettes);
	};

	const paletteEls = savedPalettes.map((palette) => {
		return (
			<div key={palette.id} className="saved-palette">
				<div
					className="saved-palette-colors"
					id={`palette-${palette.name}`}
				>
					{isCopyModalVisible && <CopyModal />}
					{palette.colors.map((color) => {
						const textColor = getContrastingTextColor(
							color.hsl.hue,
							color.hsl.saturation,
							color.hsl.lightness
						);
						return (
							<div
								key={color.hex}
								style={{
									backgroundColor: color.hex,
									color: textColor,
								}}
								className="saved-palette-color"
								onClick={() => {
									copyToClipboard(`${color.hex.slice(1)}`);
									setIsCopyModalVisible(true);
									setTimeout(() => {
										setIsCopyModalVisible(false); // auto-hide modal after 2 seconds
									}, 2000);
								}}
							>
								<p>{color.hex}</p>
							</div>
						);
					})}
					<VscChromeClose
						className="icon unsave-palette-icon"
						onClick={() => {
							unsavePalette(palette.id);
						}}
					/>
				</div>

				<div className="saved-palette-info">
					<div className="saved-palette-name flex-between">
						<h2>{palette.name}</h2>
						<BiDownload
							className="icon download-palette-icon"
							onClick={() => {
								downloadPaletteImage(palette.name);
							}}
						/>
					</div>
					<p>{palette.description}</p>
				</div>
			</div>
		);
	});

	const copyHexToClipboard = () => {
		copyToClipboard(`${color.hex.slice(1)}`);
		setIsCopyModalVisible(true);
		setTimeout(() => {
			setIsCopyModalVisible(false); // auto-hide modal after 2 seconds
		}, 2000);
	};

	return savedPalettes.length > 0 ? (
		<section className="my-palettes flex-col">
			<h1>My Palettes</h1>
			<p>Click on a color to copy the hex to your clipboard!</p>
			<div className="saved-palettes">{paletteEls}</div>
		</section>
	) : (
		<div className="link--blank-my-palettes">
			<Link to="/">Go create some funky palettes!</Link>
			<Link to="/">
				<GiBottomRight3DArrow className="arrow-icon" />
			</Link>
		</div>
	);
};

export default MyPalettes;
