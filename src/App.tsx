import { Route, Link as RouterLink, Routes } from "react-router-dom";
import ChoisirBouquet from "./pages/ChoisirBouquet";
import ChoisirFleurs from "./pages/ChoisirFleurs";
import HomePage from "./pages/HomePage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/choisir-bouquet" element={<ChoisirBouquet />} />
			<Route path="/choisir-fleurs" element={<ChoisirFleurs />} />
		</Routes>
	);
}
