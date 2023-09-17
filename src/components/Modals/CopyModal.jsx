import React from "react";
import { useColorContext } from "../../context/ColorContext";

const CopyModal = ({ message, onClose }) => {
	const { setIsModalVisible } = useColorContext();
	return (
		<div className="copy-modal-container">
			<div
				className="copy-modal-content"
				onClick={() => setIsModalVisible(false)}
			>
				<p>Hex copied to clipboard!</p>
			</div>
		</div>
	);
};

export default CopyModal;
