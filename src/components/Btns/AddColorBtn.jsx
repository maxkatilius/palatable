import React from "react";
import { BiPlus } from "react-icons/bi";
import { useColorContext } from "../../context/ColorContext";
import { generateColors } from "../../utils";

const AddColorBtn = () => {
	const { seedColor, mode, setCount, colors, setColors, lastColorId } =
		useColorContext();

	const addColor = (colorId) => {
		setCount((prevCount) => prevCount + 1);
		const newColor = generateColors(seedColor, mode, 1)[0];
		const index = colors.findIndex((col) => col.id === colorId);
		const newColorsArray = [
			...colors.slice(0, index),
			newColor,
			...colors.slice(index),
		];
		setColors(newColorsArray);
	};

	return (
		<BiPlus
			className="btn add-color-btn"
			onClick={() => {
				console.log("color added!");
				if (lastColorId !== null) addColor(lastColorId);
			}}
		/>
	);
};

export default AddColorBtn;
