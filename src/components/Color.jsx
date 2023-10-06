import React from "react";
import { copyToClipboard, getContrastingTextColor } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useColorContext } from "../context/ColorContext";
import { generateColors } from "../utils";

const Color = ({ color }) => {
	const {
		setIsCopyModalVisible,
		count,
		setCount,
		setColors,
		colors,
		mode,
		filter,
		seedColor,
	} = useColorContext();
	const isLocked = color.isLocked;
	const copyHexToClipboard = () => {
		copyToClipboard(`${color.hex.slice(1)}`);
		setIsCopyModalVisible(true);
		setTimeout(() => {
			setIsCopyModalVisible(false); // auto-hide modal after 2 seconds
		}, 2000);
	};

	const addColor = (colorId) => {
		setCount((prevCount) => prevCount + 1);
		const newColor = generateColors(seedColor, mode, 1, filter)[0];
		const index = colors.findIndex((col) => col.id === colorId);
		const newColorsArray = [
			...colors.slice(0, index),
			newColor,
			...colors.slice(index),
		];
		setColors(newColorsArray);
	};

	let closeDisabled = false;

	const removeColor = (colorId) => {
		if (count > 1) {
			setCount((prevCount) => prevCount - 1);
			setColors((prevColors) =>
				prevColors.filter((prevColor) => prevColor.id !== colorId)
			);
		}
	};

	const lockColor = (id) => {
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

	return (
		<div
			className="color-container flex-between"
			style={{
				backgroundColor: `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
			}}
		>
			<div
				className="color-details flex-between"
				style={{ color: color.textColor }}
			>
				<div className="color-text">
					<h2>{color.hex.slice(1)}</h2>
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
