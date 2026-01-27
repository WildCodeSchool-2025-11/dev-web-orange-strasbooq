import Footer from "./components/footer";
import Header from "./components/header";
import ChoisirBouquet from "./pages/ChoisirBouquet";
import "./App.css";

export default function App() {
	return (
		<div className="relative min-h-screen">
			<Header />
			<ChoisirBouquet />
			<Footer />
		</div>
	);
}
