import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorContextProvider } from "./context/ColorContext";
import { OverlayContextProvider } from "./context/OverlayContext";

// Layouts
import Layout from "./components/Layout";

// Pages
import Generator from "./pages/Generator";
import MyPalettes from "./pages/MyPalettes";
import Famous from "./pages/Famous";
import Trending from "./pages/Trending";

const App = () => {
	return (
		<BrowserRouter>
			<ColorContextProvider>
				<OverlayContextProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Generator />} />
							<Route
								path="/my-palettes"
								element={<MyPalettes />}
							/>
							<Route path="/famous" element={<Famous />} />
							<Route path="/trending" element={<Trending />} />
						</Route>
					</Routes>
				</OverlayContextProvider>
			</ColorContextProvider>
		</BrowserRouter>
	);
};

export default App;
