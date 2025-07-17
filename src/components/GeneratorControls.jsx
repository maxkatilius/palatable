import Settings from "./Settings";
import AddColorBtn from "./Btns/AddColorBtn";
import RemoveColorBtn from "./Btns/RemoveColorBtn";
import SaveBtn from "./Btns/SaveBtn";
import GenerateBtn from "./Btns/GenerateBtn";

const GeneratorControls = () => {
	return (
		<div className="generator-controls flex-between">
			<div className="generator-icons">
				<Settings />
				<AddColorBtn />
				<RemoveColorBtn />
				<SaveBtn />
			</div>
			<GenerateBtn />
		</div>
	);
};

export default GeneratorControls;
