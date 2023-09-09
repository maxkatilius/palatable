import React from "react";

import { copyToClipboard } from "../utils";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import HexModal from "./HexModal";

const Color = ({ color }) => {
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
				<div className="color-icons">
					<div className="copy-icon-container">
						<BiCopy className="copy-icon" />
					</div>
					<BiSolidLockOpenAlt className="lock-open-icon" />
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
