import React from "react";

const Modal = ({ message, onClose }) => {
	return (
		<div className="modal-background">
			<div className="modal-content" onClick={onClose}>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Modal;
