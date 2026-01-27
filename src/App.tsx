import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import About from "./pages/About";
import Home from "./pages/Home";
import Panier from "./pages/Panier";

export default function App() {
	return (
		<div className="relative min-h-screen">
			<Header />

			{/* Ajoutez le bloc Routes ici */}
			<main className="pb-[267px]">
				{" "}
				{/* Padding-bottom pour ne pas être caché par le footer absolute */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/panier" element={<Panier />} />
				</Routes>
			</main>

			<Footer />
		</div>
	);
}
