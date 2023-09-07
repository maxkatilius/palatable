import React from "react";

const HexModal = ({ message, onClose }) => {
	return (
		<div className="modal-background">
			<div className="modal-content" onClick={onClose}>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default HexModal;
