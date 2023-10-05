import React from "react";
import { useColorContext } from "../../context/ColorContext";

import { BiSave } from "react-icons/bi";

const SaveBtn = () => {
	const {
		setIsSaveModalVisible,
		setIsSaveDisabledModalVisible,
		lockedColors,
	} = useColorContext();

	return (
		<BiSave
			className="btn save-btn"
			onClick={() => {
				if (lockedColors.length) {
					setIsSaveModalVisible(true);
				} else {
					setIsSaveDisabledModalVisible(true);
					setTimeout(() => {
						setIsSaveDisabledModalVisible(false); // auto-hide modal after 2 seconds
					}, 2000);
				}
			}}
		/>
	);
};

export default SaveBtn;
