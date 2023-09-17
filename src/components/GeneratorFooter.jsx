import React from "react";

import Settings from "./Settings";
import AddColorBtn from "./Btns/AddColorBtn";
import RemoveColorBtn from "./Btns/RemoveColorBtn";
import SaveBtn from "./Btns/SaveBtn";
import GenerateBtn from "./Btns/GenerateBtn";

const GeneratorFooter = () => {
	return (
		<footer>
			<Settings />
			<RemoveColorBtn />
			<AddColorBtn />
			<SaveBtn />
			<GenerateBtn />
		</footer>
	);
};

export default GeneratorFooter;
