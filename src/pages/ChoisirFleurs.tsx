import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../public/data.json";
import ItemCard from "../components/ItemCard";
import { useCustomBouquet } from "../context/CustomBouquetContext";

function ChoisirFleurs() {
	const [etape, setEtape] = useState(1);
	const { cartItems, couleur, setCouleur } = useCustomBouquet();
	const [couleurChoisie, setCouleurChoisie] = useState<string[]>(
		couleur && couleur.length > 0 ? couleur.split(",") : [],
	);
	const navigate = useNavigate();

	const toggleCouleur = (couleurId: string) => {
		setCouleurChoisie((prev) => {
			if (prev.includes(couleurId)) {
				return prev.filter((id) => id !== couleurId);
			}
			return [...prev, couleurId];
		});
	};

	useEffect(() => {
		if (couleurChoisie.length > 0) {
			setCouleur(couleurChoisie.join(","));
		} else {
			setCouleur("");
		}
	}, [couleurChoisie, setCouleur]);

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

	let categorieActuelle = "";
	if (etape === 1) {
		categorieActuelle = "fleur";
	} else if (etape === 2) {
		categorieActuelle = "feuillage";
	} else if (etape === 3) {
		categorieActuelle = "herbe";
	}

	const canGoNext =
		etape === 4
			? couleurChoisie.length > 0
			: cartItems.filter((item) => item.categorie === categorieActuelle)
					.length > 0;
	return (
		<div className="min-h-screen p-8 bg-[#FFC7CF]">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">Je compose mon bouquet</h1>

				<h2 className="text-2xl mb-8">
					{etape === 1 && "Je choisis les fleurs"}
					{etape === 2 && "Je choisis les feuillages"}
					{etape === 3 && "Je choisis les herbes"}
					{etape === 4 && "Je choisis la tonalité du bouquet"}
				</h2>

				{etape === 4 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
						{data.couleurs.map((couleurs) => (
							<button
								key={couleurs.id}
								type="button"
								onClick={() => toggleCouleur(couleurs.id)}
								className={`p-6 rounded-2xl border-4 transition-all ${
									couleurChoisie.includes(couleurs.id)
										? "border-[#185227] shadow-lg scale-105"
										: "border-white hover:border-gray-300"
								} bg-white cursor-pointer`}
							>
								<div
									className="w-24 h-24 mx-auto mb-4 rounded-full"
									style={{
										backgroundColor: couleurs.color,
										border: couleurs.id === "blanc" ? "1px solid #ccc" : "none",
									}}
								/>
								<h3 className="text-lg font-semibold">{couleurs.nom}</h3>
							</button>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
						{itemsAffiches.map((item) => (
							<ItemCard
								key={item.id}
								item={{
									...item,
									quantity: 1,
								}}
							/>
						))}
					</div>
				)}

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

					{etape < 4 && (
						<button
							type="button"
							disabled={!canGoNext}
							onClick={() => setEtape(etape + 1)}
							className={`px-8 py-3 text-lg ${
								canGoNext
									? "bg-[#185227] hover:bg-green-600 rounded text-white cursor-pointer"
									: "bg-gray-400 text-gray-700 rounded cursor-not-allowed"
							}`}
						>
							Suivant
						</button>
					)}

					{etape === 4 && (
						<button
							type="button"
							disabled={!canGoNext}
							onClick={() => navigate("/Panier")}
							className={`px-8 py-3 text-lg ${
								canGoNext
									? "bg-[#185227] hover:bg-green-600 rounded text-white cursor-pointer"
									: "bg-gray-400 text-gray-700 rounded cursor-not-allowed"
							}`}
						>
							Valider mon bouquet
						</button>
					)}

					<button
						type="button"
						onClick={() => navigate("/conseils")}
						className="px-8 py-3 bg-[#185227] hover:bg-green-600 text-white rounded text-lg"
					>
						besoin de conseils ?{" "}
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChoisirFleurs;
