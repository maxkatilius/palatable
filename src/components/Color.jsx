import React from "react";
import { copyToClipboard, getLuminance } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useColorContext } from "../context/ColorContext";
import { generateColors } from "../utils";

const Color = ({ color }) => {
	const { setIsModalVisible, setCount, setColors, colors, mode, seedColor } =
		useColorContext();
	const [isLocked, setIsLocked] = React.useState(false);
	const copyHexToClipboard = () => {
		copyToClipboard(color.hex);
		setIsModalVisible(true);
		setTimeout(() => {
			setIsModalVisible(false); // auto-hide modal after 2 seconds
		}, 2000);
	};

	const addColor = (colorId) => {
		setCount((prevCount) => prevCount + 1);
		const newColor = generateColors(seedColor, mode, 1)[0];
		const index = colors.findIndex((col) => col.id === colorId);
		const newColorsArray = [
			...colors.slice(0, index),
			newColor,
			...colors.slice(index),
		];
		setColors(newColorsArray);
	};

	const removeColor = (colorId) => {
		setCount((prevCount) => prevCount - 1);
		setColors((prevColors) =>
			prevColors.filter((prevColor) => prevColor.id !== colorId)
		);
	};

	const lockColor = (id) => {
		console.log("Color locked!");
		setIsLocked(true);
		setColors((prevColors) =>
			prevColors.map((prevColor) => {
				return prevColor.id === id
					? {
							...prevColor,
							isLocked: true,
					  }
					: prevColor;
			})
		);
	};

	const unlockColor = (id) => {
		console.log("Color unlocked!");
		setIsLocked(false);
		setColors((prevColors) =>
			prevColors.map((prevColor) => {
				return prevColor.id === id
					? {
							...prevColor,
							isLocked: false,
					  }
					: { ...prevColor };
			})
		);
	};

	const textColor =
		getLuminance(
			color.hsl.hue / 360,
			color.hsl.saturation / 100,
			color.hsl.lightness / 100
		) > 0.5
			? "#030202"
			: "#F0F0F0";

	return (
		<div
			className="color-container"
			style={{
				backgroundColor: `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
			}}
		>
			<div className="color-details">
				<div className="color-text" style={{ color: textColor }}>
					<h2>{color.hex}</h2>
					<p>{color.name}</p>
				</div>
				<div className="color-icons-container">
					<div className="x-icon-container">
						<VscChromeClose
							className="icon x-icon"
							onClick={() => {
								removeColor(color.id);
							}}
						/>
					</div>
					<div className="copy-icon-container">
						<BiCopy
							className="icon copy-icon"
							onClick={() => copyHexToClipboard()}
						/>
					</div>
					{!isLocked && (
						<BiSolidLockOpenAlt
							className="icon lock-open-icon"
							onClick={() => lockColor(color.id)}
						/>
					)}
					{isLocked && (
						<BiSolidLockAlt
							className="icon lock-closed-icon"
							onClick={() => unlockColor(color.id)}
						/>
					)}
				</div>
			</div>
			<div className="add-color-overlay">
				<div className="add-color-container">
					<div
						className="add-color"
						onClick={() => {
							addColor(color.id);
						}}
					>
						<span>+</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Color;
