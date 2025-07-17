import { FiMinus } from "react-icons/fi";
import { useColorContext } from "../../context/ColorContext";

const RemoveColorBtn = () => {
	const { count, setCount, setColors, lastColorId } = useColorContext();

	const MIN_COLORS = 1;
	const isDisabled = count <= MIN_COLORS;

	const removeColor = (colorId) => {
		if (isDisabled) return;

		setCount((prevCount) => prevCount - 1);
		setColors((prevColors) =>
			prevColors.filter((prevColor) => prevColor.id !== colorId)
		);
	};

	return (
		<FiMinus
			className={`icon remove-color-icon ${isDisabled ? "disabled" : ""}`}
			onClick={() => {
				if (!isDisabled && lastColorId !== null)
					removeColor(lastColorId);
			}}
		/>
	);
};

export default RemoveColorBtn;
