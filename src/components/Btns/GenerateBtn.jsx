import React from "react";

import { useColorContext } from "../../context/ColorContext";

const GenerateBtn = () => {
	const { generatePalette } = useColorContext();

	return (
		<button className="btn generate-btn" onClick={() => generatePalette()}>
			Generate!
		</button>
	);
};

export default GenerateBtn;
