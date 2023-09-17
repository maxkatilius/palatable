import React from "react";
import { useColorContext } from "../../context/ColorContext";
import { nanoid } from "nanoid";

import { BiSave } from "react-icons/bi";

const SaveBtn = () => {
	const { setIsSaveModalVisible } = useColorContext();

	return (
		<BiSave
			className="btn save-btn"
			onClick={() => {
				setIsSaveModalVisible(true);
			}}
		/>
	);
};

export default SaveBtn;
