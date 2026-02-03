import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.tsx";
import Header from "./components/header.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { AuthProvider } from "./context/LogInOutContext.tsx";
import ChoisirBouquet from "./pages/ChoisirBouquet";
import ChoisirFleurs from "./pages/ChoisirFleurs";
import HomePage from "./pages/HomePage";
import MonPanier from "./pages/MonPanier.tsx";
import PageFavoris from "./pages/PageFavoris.tsx";

export default function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/choisir-bouquet" element={<ChoisirBouquet />} />
					<Route path="/choisir-fleurs" element={<ChoisirFleurs />} />
					<Route path="/Panier" element={<MonPanier />} />
					<Route path="/Favoris" element={<PageFavoris />} />
				</Routes>
				<Footer />
			</CartProvider>
		</AuthProvider>
	);
}
