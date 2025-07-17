import { FiMinus } from "react-icons/fi";
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
		<FiMinus
			className="icon remove-color-icon"
			onClick={() => {
				if (lastColorId !== null) removeColor(lastColorId);
			}}
		/>
	);
};

export default RemoveColorBtn;
