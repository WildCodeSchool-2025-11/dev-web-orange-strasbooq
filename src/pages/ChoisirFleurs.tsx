import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../public/data.json";
import ItemCard from "../components/ItemCard";
import { useCart } from "../context/CartContext";
import { useCustomBouquet } from "../context/CustomBouquetContext";

function ChoisirFleurs() {
	const [etape, setEtape] = useState(1);
	const { cartItems, couleur, setCouleur, getBouquetTotal, resetBouquet } =
		useCustomBouquet();
	const { addToCart } = useCart();
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

	const handleValiderBouquet = () => {
		const fleursDescription = cartItems
			.map((item) => `${item.nom} x${item.quantity}`)
			.join(", ");

		const couleursDescription = couleur
			.split(",")
			.filter((c) => c.trim() !== "")
			.map((c) => {
				const couleurData = data.couleurs.find((col) => col.id === c.trim());
				return couleurData?.nom || c;
			})
			.join(", ");

		const descriptionComplete = `${fleursDescription} | Tonalités: ${couleursDescription}`;

		const bouquetPersonnalise = {
			id: Date.now(),
			nom: "Bouquet personnalisé",
			description: descriptionComplete,
			prix: getBouquetTotal(),
			image_url: "/bouquetperso.png",
			quantity: 1,
		};

		addToCart(bouquetPersonnalise);
		resetBouquet();
		navigate("/Panier");
	};

	const etapes = [
		{ num: 1, label: "Fleurs" },
		{ num: 2, label: "Feuillages" },
		{ num: 3, label: "Herbes" },
		{ num: 4, label: "Tonalité" },
	];

	return (
		<main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
			{/* Header */}
			<header className="text-center mb-6 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold mb-2">
					Je compose mon bouquet
				</h1>
				<p className="text-sm sm:text-base text-gray-600">
					Personnalisez votre bouquet en 4 étapes simples.
				</p>
			</header>

			{/* Stepper */}
			<div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-10">
				{etapes.map((step, index) => (
					<div key={step.num} className="flex items-center gap-1 sm:gap-2">
						<button
							type="button"
							onClick={() => setEtape(step.num)}
							className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
								etape === step.num
									? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
									: etape > step.num
										? "bg-emerald-100 text-emerald-700"
										: "bg-gray-100 text-gray-400"
							}`}
						>
							<span
								className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
									etape === step.num
										? "bg-white text-emerald-600"
										: etape > step.num
											? "bg-emerald-200 text-emerald-700"
											: "bg-gray-200 text-gray-400"
								}`}
							>
								{etape > step.num ? "✓" : step.num}
							</span>
							<span className="hidden sm:inline">{step.label}</span>
						</button>
						{index < etapes.length - 1 && (
							<div
								className={`w-4 sm:w-8 h-0.5 ${etape > step.num ? "bg-emerald-300" : "bg-gray-200"}`}
							/>
						)}
					</div>
				))}
			</div>

			{/* Step content */}
			<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
				<h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
					{etape === 1 && "Je choisis les fleurs"}
					{etape === 2 && "Je choisis les feuillages"}
					{etape === 3 && "Je choisis les herbes"}
					{etape === 4 && "Je choisis la tonalité du bouquet"}
				</h2>

				{etape === 4 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
						{data.couleurs.map((couleurItem) => (
							<button
								key={couleurItem.id}
								type="button"
								onClick={() => toggleCouleur(couleurItem.id)}
								className={`p-3 sm:p-4 rounded-2xl border-2 transition-all ${
									couleurChoisie.includes(couleurItem.id)
										? "border-emerald-500 shadow-lg shadow-emerald-500/15 scale-105 bg-emerald-50"
										: "border-gray-200 hover:border-gray-300 bg-gray-50 hover:shadow-md"
								} cursor-pointer`}
							>
								<div
									className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full shadow-sm"
									style={{
										backgroundColor: couleurItem.color,
										border:
											couleurItem.id === "blanc" ? "1px solid #ccc" : "none",
									}}
								/>
								<h3 className="text-xs sm:text-sm font-semibold text-gray-700">
									{couleurItem.nom}
								</h3>
							</button>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
			</section>

			{/* Navigation buttons */}
			<div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
				{etape > 1 && (
					<button
						type="button"
						onClick={() => setEtape(etape - 1)}
						className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer text-sm sm:text-base"
					>
						Précédent
					</button>
				)}

				{etape < 4 && (
					<button
						type="button"
						disabled={!canGoNext}
						onClick={() => setEtape(etape + 1)}
						className={`px-6 py-3 font-medium rounded-xl transition-all text-sm sm:text-base ${
							canGoNext
								? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						Suivant
					</button>
				)}

				{etape === 4 && (
					<button
						type="button"
						disabled={!canGoNext}
						onClick={handleValiderBouquet}
						className={`px-6 py-3 font-medium rounded-xl transition-all text-sm sm:text-base ${
							canGoNext
								? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						Valider mon bouquet
					</button>
				)}

				<button
					type="button"
					onClick={() => navigate("/conseils")}
					className="group relative px-6 py-3 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium rounded-xl transition-all cursor-pointer text-sm sm:text-base"
				>
					Besoin de conseils ?
					<span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-emerald-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
				</button>
			</div>
		</main>
	);
}

export default ChoisirFleurs;
