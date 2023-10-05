import React from "react";

import Settings from "./Settings";
import AddColorBtn from "./Btns/AddColorBtn";
import RemoveColorBtn from "./Btns/RemoveColorBtn";
import SaveBtn from "./Btns/SaveBtn";
import GenerateBtn from "./Btns/GenerateBtn";

const GeneratorFooter = () => {
	return (
		<div className="generator-footer flex-between">
			<Settings />
			<RemoveColorBtn />
			<AddColorBtn />
			<SaveBtn />
			<GenerateBtn />
		</div>
	);
};

export default GeneratorFooter;
