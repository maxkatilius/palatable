import React from "react";
import { FiPlus } from "react-icons/fi";
import { useColorContext } from "../../context/ColorContext";
import { generateColors } from "../../utils";

const AddColorBtn = () => {
	const {
		seedColor,
		mode,
		filter,
		setCount,
		colors,
		setColors,
		lastColorId,
	} = useColorContext();

	const addColor = (colorId) => {
		setCount((prevCount) => prevCount + 1);
		const newColor = generateColors(seedColor, mode, 1, filter)[0];
		const index = colors.findIndex((col) => col.id === colorId);
		const newColorsArray = [
			...colors.slice(0, index),
			newColor,
			...colors.slice(index),
		];
		setColors(newColorsArray);
	};

	return (
		<FiPlus
			className="icon add-color-icon"
			onClick={() => {
				if (lastColorId !== null) addColor(lastColorId);
			}}
		/>
	);
};

export default AddColorBtn;
