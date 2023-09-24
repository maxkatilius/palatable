import React from "react";
import { useColorContext } from "../../context/ColorContext";

import { BiSave } from "react-icons/bi";

const SaveBtn = () => {
	const { setIsSaveModalVisible, lockedColors } = useColorContext();

	return (
		<BiSave
			className="btn save-btn"
			onClick={() => {
				if (lockedColors.length) {
					setIsSaveModalVisible(true);
				}
			}}
		/>
	);
};

export default SaveBtn;
