import React from "react";
import { generatePalette, getRandomColors } from "./utils.js";
import Header from "./components/Header";
import Color from "./components/Color";

const App = () => {
	const [seedColor, setSeedColor] = React.useState({
		hue: Math.floor(Math.random() * 360),
		saturation: Math.floor(Math.random() * 100),
		lightness: Math.floor(Math.random() * 100),
	});
	const [mode, setMode] = React.useState("Random");
	const [count, setCount] = React.useState("5");
	const [colors, setColors] = React.useState(getRandomColors(count));
	const colorEls = colors.map((color, index) => {
		return <Color key={color.id} color={color} />;
	});

	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.code === "Space") {
				event.preventDefault(); // prevent default spacebar actions (like scrolling)
				setColors(generatePalette(seedColor, mode, count));
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Cleanup: remove the event listener when the component is unmounted
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [seedColor, mode, count]);

	return (
		<div className="site-container">
			<Header
				mode={mode}
				setMode={setMode}
				count={count}
				setCount={setCount}
				seedColor={seedColor}
				setSeedColor={setSeedColor}
				setColors={setColors}
			/>
			<main>{colorEls}</main>
		</div>
	);
};

export default App;
