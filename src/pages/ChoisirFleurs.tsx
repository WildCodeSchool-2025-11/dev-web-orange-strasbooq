import { useState } from "react";
import data from "../../public/data.json";
import ItemCard from "../components/ItemCard";
import { Link as RouterLink } from "react-router-dom";

function ChoisirFleurs() {
	const [etape, setEtape] = useState(1);

	let itemsAffiches: typeof data.fleurs = [];
	if (etape === 1) {
		itemsAffiches = data.fleurs.filter((item) => item.categorie === "fleur");
	} else if (etape === 2) {
		itemsAffiches = data.fleurs.filter(
			(item) => item.categorie === "feuillage",
		);
	} else if (etape === 3) {
		itemsAffiches = data.fleurs.filter((item) => item.categorie === "herbe");
	}

	return (
		<div className="min-h-screen p-8 bg-[#FFC7CF]">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">Je compose mon bouquet</h1>

				<h2 className="text-2xl mb-8">
					{etape === 1 && "Je choisis les fleurs"}
					{etape === 2 && "Je choisis les feuillages"}
					{etape === 3 && "Je choisis les herbes"}
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
					{itemsAffiches.map((item) => (
						<ItemCard
							key={item.id}
							nom={item.nom}
							description={item.description}
							prix={item.prix}
							image={item.image}
						/>
					))}
				</div>

				<div className="flex gap-4 justify-center">
					{etape > 1 && (
						<button
							type="button"
							onClick={() => setEtape(etape - 1)}
							className="px-8 py-3 bg-gray-300 hover:bg-gray-400 rounded text-lg"
						>
							Précédent
						</button>
					)}

					{etape < 3 && (
						<button
							type="button"
							onClick={() => setEtape(etape + 1)}
							className="px-8 py-3 bg-[#185227] hover:bg-green-600 text-white rounded text-lg"
						>
							Valider
						</button>
					)}
					<nav className="hidden md:flex items-center gap-8">
						<RouterLink
							to="/conseils"
							className="text-black font-medium text-lg hover:text-rose-700 transition-colors duration-300 relative group"
						>
							besoin de conseils ?							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full" />
						</RouterLink>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default ChoisirFleurs;
