import React from "react";
import { copyToClipboard } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

const Color = ({
	color,
	colors,
	setColors,
	setColor,
	setCount,
	setIsModalVisible,
}) => {
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
				console.log(prevColor);
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
				console.log(prevColor);
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
			className="color-container"
			style={{
				backgroundColor: `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
			}}
		>
			<div className="color-details">
				<div className="color-text">
					<h2>{color.hex}</h2>
					<p>{color.name}</p>
				</div>
				<div className="color-icons-container">
					<div className="x-icon-container">
						<VscChromeClose
							className="icon x-icon"
							onClick={() => {
								setCount((prevCount) => prevCount - 1);
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
							setCount((prevCount) => prevCount + 1);
							console.log("Count increased!");
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
