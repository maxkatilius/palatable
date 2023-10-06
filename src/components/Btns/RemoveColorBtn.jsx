import React from "react";
import { BiMinus } from "react-icons/bi";
import { useColorContext } from "../../context/ColorContext";

const RemoveColorBtn = () => {
	const { setCount, setColors, lastColorId } = useColorContext();

	const removeColor = (colorId) => {
		setCount((prevCount) => prevCount - 1);
		setColors((prevColors) =>
			prevColors.filter((prevColor) => prevColor.id !== colorId)
		);
	};

	return (
		<BiMinus
			className="btn remove-color-btn"
			onClick={() => {
				if (lastColorId !== null) removeColor(lastColorId);
			}}
		/>
	);
};

export default RemoveColorBtn;
