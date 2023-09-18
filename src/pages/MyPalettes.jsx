import React from "react";
import { Link } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { GiBottomRight3DArrow } from "react-icons/gi";

const MyPalettes = () => {
	const [savedPalettes, setSavedPalettes] = React.useState([]);
	React.useEffect(() => {
		const palettesFromLocalStorage =
			JSON.parse(localStorage.getItem("my-palettes")) || [];
		setSavedPalettes(palettesFromLocalStorage);
	}, []);

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
				<VscChromeClose
					className="icon unsave-palette-icon"
					onClick={() => {
						unsavePalette(palette.id);
					}}
				/>
				<div className="saved-palette-colors">
					{palette.colors.map((color) => (
						<div
							key={color.hex}
							style={{ backgroundColor: color.hex }}
							className="saved-palette-color"
						></div>
					))}
				</div>
				<div className="palette-info">
					<h2>{palette.name}</h2>
					<p>{palette.description}</p>
				</div>
			</div>
		);
	});
	return savedPalettes.length > 0 ? (
		<section className="my-palettes flex-col">
			<h1>My Palettes</h1>
			{paletteEls}
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
