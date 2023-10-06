import React from "react";
import { FiSettings } from "react-icons/fi";
import { useColorContext } from "../context/ColorContext";
import { useOverlayContext } from "../context/OverlayContext";
import { hexToHSL, getContrastingTextColor } from "../utils";

const Settings = () => {
	const { settingsOpen, setSettingsOpen } = useOverlayContext();
	const { mode, setMode, seedColor, setSeedColor, filter, setFilter } =
		useColorContext();

	const [selectedSeedColor, setSelectedSeedColor] = React.useState(
		seedColor.hex
	);
	const [selectedFilter, setSelectedFilter] = React.useState(filter);

	const [textColor, setTextColor] = React.useState(
		getContrastingTextColor(seedColor.hex)
	);

	React.useEffect(() => {
		setSelectedSeedColor(seedColor.hex);
	}, [seedColor]);

	const [selectedMode, setSelectedMode] = React.useState(mode);

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
		setSelectedSeedColor(hexColor);
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
								id="cool"
								name="filter"
								value="Cool"
							/>
							<label htmlFor="cool">Cool</label>
						</div>
						<div className="flex-between form-element">
							<input
								type="radio"
								id="warm"
								name="filter"
								value="Warm"
							/>
							<label htmlFor="warm">Warm</label>
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
								id="natural"
								name="filter"
								value="Natural"
							/>
							<label htmlFor="natural">Natural</label>
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
								id="retro"
								name="filter"
								value="Retro"
							/>
							<label htmlFor="retro">Retro</label>
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
					<p style={{ color: textColor }}>
						{selectedSeedColor.toUpperCase()}
					</p>
					<input
						name="seed-color"
						type="color"
						value={selectedSeedColor}
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
						<option>Analogous</option>
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
