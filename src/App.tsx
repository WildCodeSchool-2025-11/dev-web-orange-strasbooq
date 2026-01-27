import { Route, Routes } from "react-router-dom";
import ChoisirBouquet from "./pages/ChoisirBouquet";
import ChoisirFleurs from "./pages/ChoisirFleurs";
import HomePage from "./pages/HomePage";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import "./App.css";

export default function App() {
	return (

		<>
		<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/choisir-bouquet" element={<ChoisirBouquet />} />
				<Route path="/choisir-fleurs" element={<ChoisirFleurs />} />
			</Routes>
		<Footer />
		</>
	);
}
