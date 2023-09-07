import React from "react";
import { BiSolidLockOpenAlt, BiSolidLockAlt, BiCopy } from "react-icons/bi";
import HexModal from "./HexModal";

const Color = ({ hex, name, lockColor }) => {
	const [hsl, setHsl] = React.useState({
		hue: 100,
		saturation: 50,
		lightness: 50,
	});
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	function copyToClipboard(text) {
		navigator.clipboard.writeText(text).catch((err) => {
			console.error("Could not copy text: ", err);
		});
	}

	const handleCopyClick = () => {
		copyToClipboard(hex);
		setIsModalVisible(true);
		setTimeout(() => {
			setIsModalVisible(false); // auto-hide modal after 2 seconds
		}, 2500);
	};

	return (
		<div className="color-container" style={{ backgroundColor: `#${hex}` }}>
			<div className="color-details">
				<div className="color-text">
					<h3>#{hex}</h3>
					<p>{name}</p>
				</div>
				<div className="color-icons">
					<div className="copy-icon-container">
						<BiCopy
							className="copy-icon"
							onClick={handleCopyClick}
						/>
					</div>
					<BiSolidLockOpenAlt
						className="lock-open-icon"
						onClick={lockColor}
					/>
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

//  const Color = (props) => {
//     const styles = {
//         backgroundColor: `#${props.hex}`
//     }
//     return (
//         <div className="color-container" style={styles}>
//             <h2>{props.name}</h2>
//             ...
//             <button onClick={props.lockColor}
//         </div>
//     )
//  }
