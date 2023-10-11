import React from "react";
import { useColorContext } from "../../context/ColorContext";

import { FiSave } from "react-icons/fi";

const SaveBtn = () => {
	const {
		setIsSaveModalVisible,
		setIsSaveDisabledModalVisible,
		lockedColors,
	} = useColorContext();

	return (
		<FiSave
			className="icon save-icon"
			onClick={() => {
				if (lockedColors.length) {
					setIsSaveModalVisible(true);
				} else {
					setIsSaveDisabledModalVisible(true);
					setTimeout(() => {
						setIsSaveDisabledModalVisible(false);
					}, 2000);
				}
			}}
		/>
	);
};

export default SaveBtn;
