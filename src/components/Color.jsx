import React from "react";
import { copyToClipboard } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import HexModal from "./HexModal";

const Color = ({ color, colors, setColor, setCount }) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const handleCopyClick = () => {
		copyToClipboard(hsl);
		setIsModalVisible(true);
		setTimeout(() => {
			setIsModalVisible(false); // auto-hide modal after 2 seconds
		}, 2500);
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
						<BiCopy className="icon copy-icon" />
					</div>
					<BiSolidLockOpenAlt className="icon lock-open-icon" />
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
			{isModalVisible && (
				<HexModal
					message="Hex code copied to clipboard!"
					onClose={() => setIsModalVisible(false)}
				/>
			)}
		</div>
	);
};

export default Color;
