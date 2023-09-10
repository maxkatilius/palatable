import React from "react";
import { copyToClipboard, getLuminance } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

const Color = ({ color, onAdd, onRemove, setIsModalVisible, setColors }) => {
	const [isLocked, setIsLocked] = React.useState(false);
	const copyHexToClipboard = () => {
		copyToClipboard(color.hex);
		setIsModalVisible(true);
		setTimeout(() => {
			setIsModalVisible(false); // auto-hide modal after 2 seconds
		}, 2000);
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
								onRemove();
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
							onAdd();
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
