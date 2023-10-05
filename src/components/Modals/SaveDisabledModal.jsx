import React from "react";
import { useColorContext } from "../../context/ColorContext";

const SaveDisabledModal = () => {
	const { setIsSaveDisabledModalVisible } = useColorContext();
	return (
		<div className="save-disabled-modal-container">
			<div
				className="save-disabled-modal-content"
				onClick={() => setIsSaveDisabledModalVisible(false)}
			>
				<p>Lock in some colors first!</p>
			</div>
		</div>
	);
};

export default SaveDisabledModal;
