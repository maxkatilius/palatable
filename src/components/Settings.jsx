import React from "react";
import { FiSettings } from "react-icons/fi";
import { useColorContext } from "../context/ColorContext";
import { useOverlayContext } from "../context/OverlayContext";
import { hexToHSL, getContrastingTextColor } from "../utils";
import { VscChromeClose } from "react-icons/vsc";

const Settings = () => {
	const { settingsOpen, setSettingsOpen } = useOverlayContext();
	const { mode, setMode, seedColor, setSeedColor, filter, setFilter } =
		useColorContext();

	const [seedColorHex, setSeedColorHex] = React.useState(seedColor.hex);

	const [textColor, setTextColor] = React.useState(
		getContrastingTextColor(
			seedColor.hue,
			seedColor.saturation,
			seedColor.lightness
		)
	);
	const [selectedMode, setSelectedMode] = React.useState(mode);

	// Resets the settings values to resePalette() states
	React.useEffect(() => {
		setSeedColorHex(seedColor.hex);
		setSelectedMode(mode);
		console.log(seedColor.hex);
		setTextColor(
			getContrastingTextColor(
				seedColor.hue,
				seedColor.saturation,
				seedColor.lightness
			)
		);
	}, [seedColor, mode, filter]);

	const settingsStatus = settingsOpen ? "open" : "closed";

	/**********************
	 *** Event Handlers ***
	 **********************/

	const handleSettingsInteraction = (e) => {
		e.stopPropagation(); // Stop the event from propagating up to the settings-overlay div
	};

	const toggleSettings = () => {
		setSettingsOpen((prevSettingsOpen) => !prevSettingsOpen);
	};

	const handleModeChange = (e) => {
		e.stopPropagation(); // Stop the event from propagating up to the parent div
		// This puts the mode in a corresponding format to the functions that use the mode
		const modeToStr = e.target.value.split(" ").join("");
		setMode(modeToStr);
	};

	const handleFilterChange = (e) => {
		e.stopPropagation();
		setFilter(e.target.value);
	};

	const handleSeedColorChange = (e) => {
		e.stopPropagation(); // Stop the event from propagating up to the parent div
		const hexColor = e.target.value;
		setSeedColorHex(hexColor);
		const [h, s, l] = hexToHSL(hexColor);
		setTextColor(getContrastingTextColor(h, s, l));
		setSeedColor({ hue: h, saturation: s, lightness: l, hex: hexColor });
	};

	return (
		<div className={`settings ${settingsStatus}`}>
			<div
				className={`settings-icon-container ${settingsStatus}`}
				onClick={toggleSettings}
			>
				<FiSettings className={`settings-icon ${settingsStatus}`} />
			</div>
			<div
				className={`settings-overlay flex-col ${settingsStatus}`}
				onClick={toggleSettings}
			>
				<h1>Settings</h1>
				<VscChromeClose className="settings-close" />

				<div className="settings-items flex-col">
					<div
						className={`settings-item settings-form flex-col ${settingsStatus}`}
						onClick={handleSettingsInteraction}
					>
						<label htmlFor="form-filters">Filters</label>
						<form
							name="form-filters"
							onChange={(e) => {
								handleFilterChange(e);
							}}
						>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="light"
									name="filter"
									value="Light"
								/>
								<label htmlFor="light">Light</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="dark"
									name="filter"
									value="Dark"
								/>
								<label htmlFor="dark">Dark</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="vibrant"
									name="filter"
									value="Vibrant"
								/>
								<label htmlFor="vibrant">Vibrant</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="muted"
									name="filter"
									value="Muted"
								/>
								<label htmlFor="muted">Muted</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="neon"
									name="filter"
									value="Neon"
								/>
								<label htmlFor="neon">Neon</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="pastel"
									name="filter"
									value="Pastel"
								/>
								<label htmlFor="pastel">Pastel</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="rich"
									name="filter"
									value="rich"
								/>
								<label htmlFor="rich">Rich</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="metallic"
									name="filter"
									value="Metallic"
								/>
								<label htmlFor="metallic">Metallic</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="vintage"
									name="filter"
									value="Vintage"
								/>
								<label htmlFor="vintage">Vintage</label>
							</div>
							<div className="flex-between form-element">
								<input
									type="radio"
									id="none"
									name="filter"
									value="None"
								/>
								<label htmlFor="none">None</label>
							</div>
						</form>
					</div>
					<div
						className={`settings-item settings-seed flex-col ${settingsStatus}`}
						onClick={handleSettingsInteraction}
					>
						<label htmlFor="seed-color">Seed color</label>
						<label
							htmlFor="colorInput"
							id="hexLabel"
							style={{ color: textColor }}
						>
							{seedColorHex.slice(1).toUpperCase()}
						</label>
						<input
							id="colorInput"
							name="seed-color"
							type="color"
							value={seedColorHex}
							onChange={handleSeedColorChange}
						/>
					</div>
					<div
						className={`settings-item settings-mode flex-col ${settingsStatus}`}
						onClick={handleSettingsInteraction}
					>
						<label htmlFor="select-mode">Palette type</label>
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
							<option>Monochromatic</option>
							<option>Complementary</option>
							<option>Split Complementary</option>
							<option>Analogous</option>
							<option>Triadic</option>
							<option>Tetradic</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
