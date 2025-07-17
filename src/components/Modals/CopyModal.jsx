import { useColorContext } from "../../context/ColorContext";

const CopyModal = () => {
	const { setIsCopyModalVisible } = useColorContext();
	return (
		<div className="copy-modal-container">
			<div
				className="copy-modal-content"
				onClick={() => setIsCopyModalVisible(false)}
			>
				<p>Hex copied to clipboard!</p>
			</div>
		</div>
	);
};

export default CopyModal;
