import React from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Color from "./components/Color";

const App = () => {
	const [colors, setColors] = React.useState([]);
	const [seedColor, setSeedColor] = React.useState("FAA0A0");
	const [seedHsl, setSeedHsl] = React.useState({
		hue: 30,
		saturation: 50,
		lightness: 50,
	});
	const [mode, setMode] = React.useState("");
	const [count, setCount] = React.useState("5");

	const baseApiUrl = "https://www.thecolorapi.com";

	const getComplimentaryColors = (hsl, count) => {
		const complimentaryColors = [];
		for (i = 0; i < count; i++) {
			const complimentaryHue = hsl.hue + 180 + i * 10;
			const complimentarySaturation = hsl.saturation - 10 * i;
			const complimentaryLightness = hsl.lightness - 10 * i;
			const complimentaryColor = {
				hue: complimentaryHue,
				saturation: complimentarySaturation,
				lightness: complimentaryLightness,
			};
			complimentaryColors.push(complimentaryColor);
			console.log(complimentaryColors);
		}
	};

	const getAnalogicColor = (hsl) => {
		const complimentaryHue = hsl.hue + 30;
		const complimentaryColor = {
			...hsl,
			hue: complimentaryHue,
		};
	};

	async function getColors() {
		const res = await fetch(
			`${baseApiUrl}/scheme?hex=${seedColor}&mode=${mode}&count=${count}`
		);
		const data = await res.json();
		setColors(
			data.colors.map((color) => {
				return {
					key: nanoid(),
					hex: color.hex.clean,
					name: color.name.value,
					isLocked: false,
				};
			})
		);
		console.log(colors);
	}

	// getColors();

	async function getColorInfo(hex) {
		const res = await fetch(`${baseApiUrl}/id?hex=${hex}`);
		const data = await res.json();
		console.log(data);
	}

	// getColorInfo("FAA0A0");

	const colorEls = colors.map((color) => {
		return <Color key={color.key} hex={color.hex} name={color.name} />;
	});

	return (
		<div className="site-container">
			<Header
				setMode={setMode}
				setCount={setCount}
				setSeedColor={setSeedColor}
				getColors={getColors}
			/>
			<main>{colorEls}</main>
		</div>
	);
};

export default App;
