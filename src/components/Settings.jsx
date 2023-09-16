import React from "react";
import { FiSettings } from "react-icons/fi";
import { useColorContext } from "../context/ColorContext";
import { useOverlayContext } from "../context/OverlayContext";

const Settings = () => {
	const { settingsOpen, setSettingsOpen } = useOverlayContext();
	const { mode, setMode, seedColor, setSeedColor } = useColorContext();

	const [selectedSeedColor, setSelectedSeedColor] = React.useState(seedColor);
	const [selectedMode, setSelectedMode] = React.useState(mode);

	const settingsStatus = settingsOpen ? "open" : "closed";

	/**********************
	 *** Event Handlers ***
	 **********************/

	const toggleSettings = () => {
		setSettingsOpen((prevSettingsOpen) => !prevSettingsOpen);
	};

	const handleModeChange = (e) => {
		// This puts the mode in a corresponding format to the functions that use the mode
		const modeToStr = e.target.value.split(" ").join("");
		setMode(modeToStr);
		console.log(mode);
	};

	const handleSeedColorChange = (e) => {
		const hexColor = e.target.value;
		const [h, s, l] = hexToHSL(hexColor);
		setSeedColor({ hue: h, saturation: s, lightness: l });
	};

	return (
		<div className={`settings ${settingsStatus}`}>
			<div
				className={`settings-icon-container ${settingsStatus}`}
				onClick={toggleSettings}
			>
				<FiSettings className={`settings-icon ${settingsStatus}`} />
			</div>
			<div className={`settings-selectors ${settingsStatus}`}>
				<h1>Settings</h1>
				<div
					className={`settings-selector settings-seed ${settingsStatus}`}
				>
					<label htmlFor="seed-color">Change the seed color!</label>
					<input
						name="seed-color"
						type="color"
						value={selectedSeedColor}
						onChange={handleSeedColorChange}
					/>
				</div>
				<div
					className={`settings-selector settings-form ${settingsStatus}`}
				>
					<label htmlFor="form-filters">Add filters!</label>
					<form
						name="form-filters"
						onChange={() => {
							console.log("filters changed!");
						}}
					>
						<div className="form-element">
							<label htmlFor="pastel">Pastel</label>
							<input
								type="radio"
								id="pastel"
								name="pastel"
								value="Pastel"
							/>
						</div>
						<div className="form-element">
							<label htmlFor="vibrant">Vibrant</label>
							<input
								type="radio"
								id="vibrant"
								name="vibrant"
								value="Vibrant"
							/>
						</div>
					</form>
				</div>
				<div
					className={`settings-selector settings-mode ${settingsStatus}`}
				>
					<label htmlFor="select-mode">
						Change the palette type!
					</label>
					<select
						name="select-mode"
						className="select-mode"
						value={selectedMode}
						onChange={(e) => {
							setSelectedMode(e.target.value);
							handleModeChange(e); // you can still call this function to handle other logic
						}}
					>
						<option>Random</option>
						<option>Vibrant</option>
						<option>Pastel</option>
						<option>Monochrome</option>
						<option>Dark Monochrome</option>
						<option>Light Monochrome</option>
						<option>Analogous</option>
						<option>Analogous Complementary</option>
						<option>Complementary</option>
						<option>Split Complementary</option>
						<option>Triadic</option>
						<option>Tetradic</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Settings;
